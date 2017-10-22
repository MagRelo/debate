var stream_node = require('getstream-node');
var FeedManager = stream_node.FeedManager;
var StreamMongoose = stream_node.mongoose;
var StreamBackend = new StreamMongoose.Backend();

var bluebird = require('bluebird')

// Models
var UserModel = require('../models/user')
var FollowModel = require('../models/follow')


function nextTokenPrice(tokensOutstanding){
  const exponent = 20
  return Math.floor(Math.log(tokensOutstanding + 1) * exponent)
}
function purchasePrice(tokensOutstanding, numberOfTokensToPurchase){
  tokens = Array(numberOfTokensToPurchase).fill('');
  return tokens.reduce((sum, token, index)=>{
    return sum + nextTokenPrice(tokensOutstanding + index)
  }, 0)
}


function currentTokenPrice(tokensOutstanding){
  return (Math.floor(purchasePrice(0, tokensOutstanding)/tokensOutstanding))
}
function salePrice(tokensOutstanding, numberOfTokensToSell){
  tokens = Array(numberOfTokensToSell).fill('');
  return tokens.reduce((sum, token, index)=>{
    return sum + currentTokenPrice(tokensOutstanding - index)
  }, 0)
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

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
      user.priceOfNextToken = nextTokenPrice(user.tokensOutstanding)
      user.salePriceOfCurrentToken = currentTokenPrice(user.tokensOutstanding)

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

function getUserWithBalances(userId){

  return bluebird.all([
    UserModel.findOne({_id: userId}).lean(),
    FollowModel.find({user: userId}).lean(),
    FollowModel.find({target: userId}).lean()
  ])
  .then((responseArray)=>{

    let userObject = responseArray[0]
    let followingArray = responseArray[1]
    let followedArray = responseArray[2]

    // Users that you are following
    userObject.followingCount = followingArray.length
    userObject.amountStaked = followingArray.reduce((sum, follow) => {
      return sum + follow.tokens
    }, 0)

    // Users that are following you
    userObject.followerCount = followedArray.length
    userObject.amountStakedonYou = followedArray.reduce((sum, follow) => {
      return sum + follow.tokens
    }, 0)


    userObject.priceOfNextToken = nextTokenPrice(userObject.tokensOutstanding)
    userObject.salePriceOfCurrentToken = currentTokenPrice(userObject.tokensOutstanding)

    userObject.totalBalance = userObject.balance + userObject.amountStaked + userObject.amountStakedonYou

    return userObject
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
      return response.json(mongoResponse)
    }).catch((error)=>{
      return response.json(error)
    })

}

exports.getUser = (request, response) => {

  const userId = request.params.userId || 'default name'

  getUserWithBalances(userId)
    .then(user => {
      return response.json(user)
    })
    .catch((error)=>{
      return response.json(error)
    })

}

exports.followUser = (request, response) => {

  // data from request
  const userId =  request.body.user || ''
  const targetId = request.body.target || ''
  const tokensToPurchase = request.body.tokensToPurchase || ''

  // create variables for the results of mongo queries
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

    // get token price
    tokenPurchasePrice = purchasePrice(target.tokensOutstanding, tokensToPurchase)

    // check that user has available balance > stakeValue
    if(!isNumeric(tokensToPurchase) || user.balance < tokenPurchasePrice){
      throw {
        clientError: true,
        status: 400,
        message: 'bad request data',
        data: {
          tokensToPurchaseNumeric: isNumeric(tokensToPurchase),
          balanceAvailable: user.balance > tokenPurchasePrice
        }
      }
    }

    // decrease user balance and save
    user.balance = user.balance - tokenPurchasePrice
    return user.save()

  }).then((user) => {

    if(follow){

      // increase stake of existing follow
      follow.tokens = follow.tokens + tokensToPurchase
      return follow.save()

    } else {

      // create new follow
      const newFollow = new FollowModel({
        user: userId,
        target: targetId,
        tokens: tokensToPurchase
      })
      return newFollow.save()

    }

  }).then((follow) => {

    // increment target tokens outstanding
    target.tokensOutstanding = target.tokensOutstanding + tokensToPurchase
    target.escrowBalance = target.escrowBalance + tokenPurchasePrice
    return target.save()

  }).then((target) => {

    // get updated user balances
    return getUserWithBalances(user._id)

  }).then((user) => {

    // send response
    return response.json(user)

  }).catch((error) => {

    // client error
    if(error.clientError){
      console.error(error.message)
      return response.status(error.status).json({error: error.message});
    }

    // server error
    console.error(error.message)
    return response.status(500).json({error: error.message});

  })

}

exports.unFollowUser = (request, response) => {

  // data from request
  const userId =  request.body.user || ''
  const targetId = request.body.target || ''

  let tokensStaked = 0
  let tokenSalePrice = 0

  // find the follow to delete
  FollowModel.findOne({ user: userId, target: targetId })
    .then(follow => {

      if(!follow){
        throw {
          clientError: true,
          status: 400,
          message: 'follow not found',
          data: {
            follow: !!follow,
          }
        }
      }

      // save stake value to refund to User
      tokensStaked = follow.tokens
      tokenSalePrice = salePrice(follow.tokensOutstanding, follow.tokens)

      // remove follow
      return follow.remove()

  }).then((status) => {
    return UserModel.findOne({_id: targetId})
  }).then((target) => {

    // increment target tokens outstanding
    target.tokensOutstanding = target.tokensOutstanding - tokensStaked
    target.escrowBalance = target.escrowBalance - tokenSalePrice
    return target.save()

  }).then((user) => {
    return UserModel.findOne({_id: userId})
  }).then((user) => {

    // refund stakeValue to User
    user.balance = user.balance + stakeValue
    return user.save()

  }).then((user) => {

    // get updated user balances
    return getUserWithBalances(user._id)

  }).then((user) => {

    // send response
    return response.json(user)

  }).catch((error) => {

    // client error
    if(error.clientError){
      console.error(error.message)
      return response.status(error.status).json({error: error.message});
    }

    // server error
    console.error(error.message)
    return response.status(500).json({error: error.message});

  })

}
