var stream_node = require('getstream-node');
var FeedManager = stream_node.FeedManager;
var StreamMongoose = stream_node.mongoose;
var StreamBackend = new StreamMongoose.Backend();

var bluebird = require('bluebird')

// Models
var UserModel = require('../models/user')
var FollowModel = require('../models/follow')

const pricingFunctions = require('../config/pricing')
const utils = require('../config/utils')

function markFollowers (users, followers, userId) {

  var followerIds = followers.map(function(item) {
		return item.target.toHexString();
	});

  let markedUsers = users
    .filter(user => {
      // remove the current user from the follow/unfollow list
      return userId !== user._id.toHexString()
    })
    .map((user) => {

      // calc prices for display and search
      user.priceOfNextToken = pricingFunctions.nextTokenPrice(user.tokenSupply)
      user.salePriceOfCurrentToken = pricingFunctions.currentTokenPrice(user.tokenSupply, user.escrowBalance)

      // mark the users that the current user is following
      if (followerIds.indexOf(user._id.toHexString()) !== -1){
        user.followed = true;
      }

      return user
    })

  return markedUsers
};

function getMarkedUserList (userId){
  let userList = []

  return UserModel.find({}).lean()
    .then((userListArray)=>{
      userList = userListArray
      return FollowModel.find({user: userId}).lean()
    }).then((FollowArray)=>{
      return markFollowers(userList, FollowArray, userId)
    })
}



exports.listUsers = (request, response) => {

  return getMarkedUserList(request.body.userId)
    .then((enrichedUserList)=>{
      return response.json(enrichedUserList)
    }).catch((error)=>{
      console.error(error.message)
      return response.status(500).json({error: error.message});
    })

}

exports.saveUser = (request, response) => {

  const userName = request.body.name || 'default name'
  const avatarUrl = request.body.avatarUrl || 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'

  const user = new UserModel({
    name: userName,
    avatarUrl: avatarUrl,
    timestamp: new Date()
  })

  return user.save()
    .then((mongoResponse)=>{
      // follow yourself so you're activity shows up in timeline feed
      const newFollow = new FollowModel({ user: userId, target: userId })
      return newFollow.save()
    }).then((mongoResponse)=>{
      return response.json(mongoResponse)
    }).catch((error)=>{
      return response.json(error)
    })

}

exports.getUser = (request, response) => {

  const userId = request.params.userId || 'default name'

  UserModel.findOne({_id: userId})
    .then(user => {

      let userObject = user.toObject()

      // calc prices for display and search
      userObject.priceOfNextToken = pricingFunctions.nextTokenPrice(user.tokenSupply)
      userObject.salePriceOfCurrentToken = pricingFunctions.currentTokenPrice(user.tokenSupply, user.escrowBalance)

      return response.json(userObject)
    })
    .catch((error)=>{
      return response.json(error)
    })

}


exports.purchaseTokens = (request, response) => {

  // TODO: data from auth
  const userId =  request.body.user || ''

  // data from request
  const targetId = request.body.target || ''
  const tokensToPurchase = request.body.tokensToPurchase || null

  // validate inputs
  if(!userId || !targetId || !utils.isNumeric(tokensToPurchase)){
    return response.status(400).json({
      clientError: true,
      status: 400,
      message: 'bad request data',
      data: {
        tokensToPurchaseNumeric: utils.isNumeric(tokensToPurchase),
      }
    })
  }

  // create scoped variables
  let user = null
  let target = null
  let follow = null
  let tokenPurchasePrice = 0

  // get: user, target, and any existing follows
  bluebird.all([
    UserModel.findOne({ _id: userId }),
    UserModel.findOne({ _id: targetId }),
    FollowModel.findOne({ user: userId, target: targetId })
  ]).then((reponseArray) => {

    // unpack array of mongo queries
    user = reponseArray[0]
    target = reponseArray[1]
    follow = reponseArray[2]

    // check that user exists, target exists
    if(!user || !target){
      throw {
        clientError: true,
        status: 400,
        message: 'users not found',
        data: {
          user: !!user,
          target: !!target
        }
      }
    }

    // get token prices
    tokenPurchasePrice = pricingFunctions.purchasePrice(target.tokenSupply, tokensToPurchase)

    // check that user has enough funds
    if(user.balance < tokenPurchasePrice){
      throw {
        clientError: true,
        status: 400,
        message: 'not enough funds',
        data: {
          balanceAvailable: user.balance < tokenPurchasePrice,
        }
      }
    }

    // Step #1 - decrease user balance
    user.balance = user.balance - tokenPurchasePrice
    return user.save()

  }).then((updatedUser) => {

    // Step #2 - create new tokens and assign to user
    target.createAndAssignNewTokens(user._id.toHexString(), tokensToPurchase)
    target.escrowBalance = target.escrowBalance + tokenPurchasePrice
    return target.save()

  }).then((updatedTarget) => {

    // Step #3 - update user's wallet to reflect new coins
    user.saveToWallet(target._id.toHexString(), tokensToPurchase)
    return user.save()

  }).then((updatedUser) => {

    // Step #4 - create follow relationship
    if(!follow){

      const newFollow = new FollowModel({ user: userId, target: targetId })
      return newFollow.save()

    } else {
      // do nothing
      return {'ok': 1}
    }

  }).then((updatedFollow) => {
    return UserModel.findOne({ _id: userId }).lean()
  }).then((updatedUser) => {

    // send response
    return response.json(updatedUser)

  }).catch((error) => {

    // client error
    if(error.clientError){
      console.error(error.message)
      return response.status(error.status).json(error);
    }

    // server error
    console.error(error.message)
    return response.status(500).json({error: error.message});

  })

}

exports.sellTokens = (request, response) => {

  // TODO: data from auth
  const userId =  request.body.user || ''

  // data from request
  const targetId = request.body.target || ''
  const tokensToSell = request.body.tokensToSell || null

  // validate inputs
  if(!userId || !targetId || !utils.isNumeric(tokensToSell)){
    return response.status(400).json({
      clientError: true,
      status: 400,
      message: 'bad request data',
      data: {
        user: !!user,
        target: !!target,
        tokensToSell: tokensToSell,
        tokensToSellNumeric: utils.isNumeric(tokensToSell),
      }
    })
  }

  // value of tokens to sell
  let targetTokenSellValue = 0

  // get: user, target, and any existing follows
  bluebird.all([
    UserModel.findOne({ _id: userId }),
    UserModel.findOne({ _id: targetId })
  ]).then((reponseArray) => {

    // unpack array of mongo queries
    user = reponseArray[0]
    target = reponseArray[1]

    // get target info
    targetTokenSellValue = pricingFunctions.salePrice(target.tokenSupply, target.escrowBalance, tokensToSell)

    // validate inputs
    if(!user || !target || target.ownedTokenCount(userId) < tokensToSell){
      throw {
        clientError: true,
        status: 400,
        message: 'bad data',
        data: {
          user: !!user,
          target: !!target,
          tokensToSell: tokensToSell,
          targetTokensAvailableForSale: target.ownedTokenCount(userId)
        }
      }
    }

    // Step #1 - remove tokens from user wallet
    user.removeFromWallet(target._id.toHexString(), tokensToSell)
    return user.save()

  }).then((updatedUser) => {

    // Step #2 - remove tokens from target ledger
    target.destroyTokens(user._id.toHexString(), tokensToSell)

    // Step #3 - reduce target's escrow balance
    target.escrowBalance = target.escrowBalance - targetTokenSellValue
    return target.save()

  }).then((updatedTarget) => {

    // Step #4 - transfer token sell value to user
    user.balance = user.balance + targetTokenSellValue
    return user.save()

  }).then((responseArray) => {

    // Step #5 - if user's token balance was decreased to zero then remove follow
    if(!target.ownedTokenCount(user._id.toHexString())){
      return FollowModel.remove({user: user._id})
    }

    // return empty object to continue promise chain
    return {}

  }).then((response) => {
    return UserModel.findOne({ _id: userId }).lean()
  }).then((user) => {
    // send response
    return response.json(user)
  }).catch((error) => {

    // client error
    if(error.clientError){
      console.error(error.message)
      return response.status(error.status).json(error);
    }

    // server error
    console.error(error.message)
    return response.status(500).json({error: error.message});

  })

}
