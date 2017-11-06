var stream_node = require('getstream-node');
var FeedManager = stream_node.FeedManager;
var StreamMongoose = stream_node.mongoose;
var StreamBackend = new StreamMongoose.Backend();

var bluebird = require('bluebird')

// Models
const UserModel = require('../models/user')
const populateTargets = 'walletArray.user tokenLedger.user'
const populateFields= 'name avatarUrl tokenLedgerCount tokenLedgerEscrowBalance tokenBuyPrice tokenSellPrice tokenHistory'

const FollowModel = require('../models/follow')
const ContractModel = require('../models/contract')

const pricingFunctions = require('../config/pricing')
const utils = require('../config/utils')
const randomWords = require('random-words');

// List
exports.listContracts = (request, response) => {

  // get: user, target, and any existing follows
  ContractModel.find({}).sort({contractEscrowBalance: -1})
    .then((contractArray) => {
    return response.json(contractArray)
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

exports.getContract = (request, response) => {

  const contractId = request.params.contractId

  // get: user, target, and any existing follows
  ContractModel.findOne({_id: contractId})
    .then((contract) => {
    return response.json(contract)
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

exports.createContract = (request, response) => {

  // get from req.user
  const userId = '59fb427172ffe62800d6d400'

  const contractOptions = request.body.contractOptions


  // validate params
  if(!contractOptions || !userId){
    return response.status(400).json({
      clientError: true,
      status: 400,
      message: 'bad request data',
      data: {
        contractOptions: contractOptions
      }
    })
  }

  newContract = new ContractModel({
    owner: userId,
    contractOptions: contractOptions,
    words: randomWords(3),
    timestamp: new Date()
  })

  newContract.save()
    .then(contract => {
      return UserModel.findByIdAndUpdate(
        {_id: userId},
        {$push:{contracts: contract._id}},
        {new: true}
      )
    })
    .then(result => response.json(result))
    .catch((error) => {

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

exports.buyTokens = (request, response) => {


  // TODO: data from auth
  // const userId =  request.user || ''
  const userId = '56a3e4661f46c422ef8bad42'

  const targetId = request.body.targetId
  const tokensToPurchase = request.body.tokensToPurchase
  const payment = request.body.payment

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
    ContractModel.findOne({ _id: targetId }),
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

    // get total purchase price of the order
    tokenPurchasePrice = target.getPurchaseTotal(tokensToPurchase)

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
    user.balance = utils.round(user.balance - tokenPurchasePrice, 4)
    return user.save()

  }).then((updatedUser) => {

    // Step #2 - create new tokens and assign to user
    target.buy(user._id.toHexString(), tokensToPurchase, tokenPurchasePrice)
    return target.save()

  }).then((updatedTarget) => {

    // Step #3 - update user's wallet to reflect new coins
    user.saveToWallet(target._id.toHexString(), tokensToPurchase, tokenPurchasePrice)
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
    return ContractModel.findOne({ _id: targetId })
  }).then((contract) => {
    return response.json(contract)
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

  // // TODO: data from auth
  // const userId =  request.body.user || ''
  const userId = '56a3e4661f46c422ef8bad42'

  const targetId = request.body.targetId
  const tokensToSell = request.body.tokensToSell

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
    ContractModel.findOne({ _id: targetId })
  ]).then((reponseArray) => {

    // unpack array of mongo queries
    user = reponseArray[0]
    target = reponseArray[1]

    // get target info
    targetTokenSellValue = pricingFunctions.salePrice(target.tokenLedgerCount, target.contractEscrowBalance, tokensToSell)

    // validate inputs
    if(!user || !target || target.getTokenCountByUser(userId) < tokensToSell){
      throw {
        clientError: true,
        status: 400,
        message: 'bad data',
        data: {
          user: !!user,
          target: !!target,
          tokensToSell: tokensToSell,
          targetTokensAvailableForSale: target.getTokenCountByUser(userId)
        }
      }
    }

    // Step #1 - remove tokens from user wallet
    user.removeFromWallet(target._id.toHexString(), tokensToSell, target.getSaleTotal(tokensToSell))
    return user.save()

  }).then((updatedUser) => {

    // Step #2 - remove tokens from target ledger
    target.sell(user._id.toHexString(), tokensToSell, targetTokenSellValue)
    return target.save()

  }).then((updatedTarget) => {

    // Step #3 - transfer token sell value to user
    user.balance = utils.round(user.balance + targetTokenSellValue, 4)
    return user.save()

  }).then((responseArray) => {

    // Step #4 - if user's token balance was decreased to zero then remove follow
    if(!target.getTokenCountByUser(user._id.toHexString())){
      return FollowModel.remove({user: user._id})
    }

    // return empty object to continue promise chain
    return {}

  }).then((response) => {
    return UserModel.findOne({ _id: userId }).populate(populateTargets, populateFields)
  }).then((user) => {
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

exports.burnTokens = (request, response) => {

  // // TODO: data from auth
  // const userId =  request.body.user || ''
  const userId = '56a3e4661f46c422ef8bad42'
  const targetUserId = '56a3e4661f46c422ef8bad42'

  const targetContractId = request.body.targetId
  const tokensToBurn = request.body.tokensToBurn

  // validate inputs
  if(!userId || !targetContractId || !utils.isNumeric(tokensToBurn)){
    return response.status(400).json({
      clientError: true,
      status: 400,
      message: 'bad request data',
      data: {
        userId: userId,
        targetContractId: targetContractId,
        tokensToBurn: tokensToBurn,
        tokensToSellNumeric: utils.isNumeric(tokensToBurn),
      }
    })
  }

  // get: user, target, and any existing follows
  bluebird.all([
    UserModel.findOne({ _id: userId }),
    ContractModel.findOne({ _id: targetContractId }),
    UserModel.findOne({ _id: targetUserId }),
  ]).then((reponseArray) => {

    // unpack array of mongo queries
    user = reponseArray[0]
    target = reponseArray[1]
    targetUser = reponseArray[2]

    // validate inputs
    if(!user || !target || target.getTokenCountByUser(targetUserId) < tokensToBurn){
      throw {
        clientError: true,
        status: 400,
        message: 'bad data',
        data: {
          user: !!user,
          target: !!target,
          tokensToBurn: tokensToBurn,
          targetTokensAvailableForBurn: target.getTokenCountByUser(targetUserId)
        }
      }
    }

    // Step #1 - remove tokens from target ledger
    target.burn(user._id.toHexString(), tokensToBurn)
    return target.save()

  }).then((updatedTargetContract) => {

    // Step #2 - remove tokens from user wallet
    targetUser.removeFromWallet(targetContractId, tokensToBurn, 0)
    return targetUser.save()

  }).then((updatedTarget) => {

    // Step #3 - if user's token balance was decreased to zero then remove follow
    if(!target.getTokenCountByUser(user._id.toHexString())){
      return FollowModel.remove({user: targetUserId})
    }

    // else return to continue promise chain
    return

  }).then((response) => {
    return UserModel.findOne({ _id: userId }).populate(populateTargets, populateFields)
  }).then((user) => {
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

// Drain Escrow
exports.drainEscrow = (request, response) => {


  // // TODO: data from auth
  // const userId =  request.body.user || ''
  const userId = '56a3e4661f46c422ef8bad42'

  const targetId = request.body.targetId || ''
  const drainAmount = parseInt(request.body.drainAmount, 10) || null

  // validate inputs
  if(!userId || !targetId || !utils.isNumeric(drainAmount)){
    return response.status(400).json({
      clientError: true,
      status: 400,
      message: 'bad request data',
      data: {
        user: !!user,
        target: !!target,
        drainAmount: drainAmount
      }
    })
  }

  // get: user, target, and any existing follows
  bluebird.all([
    UserModel.findOne({ _id: userId }),
    ContractModel.findOne({ _id: targetId })
  ]).then((reponseArray) => {

    // unpack array of mongo queries
    user = reponseArray[0]
    target = reponseArray[1]

    // validate inputs
    if(!user || !target || user._id === target.owner){
      throw {
        clientError: true,
        status: 400,
        message: 'bad data',
        data: {
          user: !!user,
          target: !!target,
          drainAmount: drainAmount,
          isOwner: user._id === target.owner
        }
      }
    }

    // Step #1 - drain amount from target ledger
    target.drain(drainAmount)
    return target.save()

  }).then((updatedTarget) => {

    // Step #2 - transfer drainAmount to user
    user.balance = utils.round(user.balance + drainAmount, 4)
    return user.save()

  }).then((responseArray) => {
    return UserModel.findOne({ _id: userId }).populate(populateTargets, populateFields)
  }).then((user) => {
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
