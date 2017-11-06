'use strict';

var utils = require('../config/utils')

const crypto = require('crypto');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContractSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  contractOptions: {
    name: {type: String, required: true},
    avatarUrl: {type: String, default: 'https://cdn0.iconfinder.com/data/icons/iconico-3/1024/48.png'},
    tokenBasePrice: {type: Number, required: true},
    exponent: {type: Number, required: true},
    exponentDivisor: {type: Number, required: true},
    ownerCanBurn: {type: Boolean, required: true},
    ownerCanDrain: {type: Boolean, required: true}
  },
  words: {type: Array, unique: true},
  key: {type: Buffer, required: true, default: crypto.randomBytes(32)},
  contractEscrowBalance: {type: Number, default: 0},
  tokenLedger: [
    {
      user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
      tokenCount: Number,
      totalPurchasePrice: Number
    }
  ],
  tokenBuyPrice: {type: Number, default: 10},
  tokenSellPrice: {type: Number, default: 0},
  tokenLedgerCount: {type: Number, default: 0},
  tokenHistory: Array,
  timestamp: Date
});

ContractSchema.methods.buy = function(userAddress, numberOfTokens, payment) {

  let tokenPurchaseCost = _purchaseTotal.call(this, numberOfTokens)

  // Check that payment is greater than token price
  if(payment < tokenPurchaseCost){
    throw {
      clientError: true,
      status: 400,
      message: 'payment is less than cost'
    }
  }

  // Add or update token owner in ledger
  const ownerLedgerEntryIndex = this.tokenLedger.findIndex(x => x.user.toHexString() == userAddress);
  if(ownerLedgerEntryIndex === -1){

    // add
    this.tokenLedger.push({
      'user': userAddress,
      'tokenCount': numberOfTokens,
      'totalPurchasePrice': payment
    })

  } else {

    // update
    const ledgerObj = this.tokenLedger[ownerLedgerEntryIndex]
    ledgerObj.tokenCount = ledgerObj.tokenCount + parseInt(numberOfTokens, 10)
    ledgerObj.totalPurchasePrice = ledgerObj.totalPurchasePrice + payment
    this.tokenLedger[ownerLedgerEntryIndex] = ledgerObj

  }

  // update token ledger escrow balance
  this.contractEscrowBalance = this.contractEscrowBalance + payment

  // update token count and prices
  this.tokenLedgerCount = this.tokenLedgerCount + numberOfTokens
  this.tokenBuyPrice = _nextBuyPrice.call(this, this.tokenLedgerCount)
  this.tokenSellPrice = _sellPrice.call(this)

  // record transaction
  this.tokenHistory.push({
    type: 'create',
    timestamp: new Date(),
    purchase: {
      userAddress: userAddress,
      isSelf: userAddress === this._id.toHexString(),
      numberOfTokens: numberOfTokens,
      payment: payment,
    },
    buyPrice: this.tokenBuyPrice,
    sellPrice: this.tokenSellPrice
  })

}

ContractSchema.methods.sell = function(userAddress, numberOfTokens) {

  // get token ledger object that is owner by the user
  const ownerLedgerEntryIndex = this.tokenLedger.findIndex(x => x.user.toHexString() == userAddress);
  const ledgerObj = this.tokenLedger[ownerLedgerEntryIndex]

  // Check that owner owns the tokens
  if(!ledgerObj || ledgerObj.tokenCount < numberOfTokens){
    throw {
      clientError: true,
      status: 400,
      message: 'contract: bad data'
    }
  }

  // update ledger array object token count
  ledgerObj.tokenCount = ledgerObj.tokenCount - parseInt(numberOfTokens, 10)

  // update or remove
  if(ledgerObj.tokenCount > 0){
    // update
    this.tokenLedger[ownerLedgerEntryIndex] = ledgerObj
  } else {
    // delete object if tokens = 0
    this.tokenLedger.splice([ownerLedgerEntryIndex], 1)
  }


  // update contract escrow balance
  if((this.tokenLedgerCount - numberOfTokens) === 0 ){
    this.contractEscrowBalance = 0
  } else {
    this.contractEscrowBalance = this.contractEscrowBalance - utils.round(_sellPrice.call(this) * numberOfTokens, 4)
  }


  // update total token count
  this.tokenLedgerCount = this.tokenLedgerCount - numberOfTokens

  // Calc new prices
  this.tokenBuyPrice = _nextBuyPrice.call(this, this.tokenLedgerCount)
  this.tokenSellPrice = _sellPrice.call(this)

  // record transaction
  this.tokenHistory.push({
    type: 'sell',
    timestamp: new Date(),
    purchase: {
      userAddress: userAddress,
      isSelf: userAddress === this._id.toHexString(),
      numberOfTokens: numberOfTokens
    },
    buyPrice: this.tokenBuyPrice,
    sellPrice: this.tokenSellPrice
  })
}

ContractSchema.methods.burn = function(userAddress, numberOfTokens) {

  const ownerLedgerEntryIndex = this.tokenLedger.findIndex(x => x.user.toHexString() == userAddress);
  const ledgerObj = this.tokenLedger[ownerLedgerEntryIndex]

  // Check that tokens exist
  if(!ledgerObj || ledgerObj.tokenCount < numberOfTokens){
    throw {
      clientError: true,
      status: 400,
      message: 'contract: bad data'
    }
  }

  // update ledger array object
  ledgerObj.tokenCount = ledgerObj.tokenCount - parseInt(numberOfTokens, 10)

  // update or remove
  if(ledgerObj.tokenCount - parseInt(numberOfTokens, 10) > 0){
    // update
    this.tokenLedger[ownerLedgerEntryIndex] = ledgerObj
  } else {
    // delete object if tokens = 0
    this.tokenLedger.splice([ownerLedgerEntryIndex], 1)
  }

  // update token ledger token count
  this.tokenLedgerCount = this.tokenLedgerCount - numberOfTokens

  // * DO NOT * decrease the token ledger escrow balance

  // Calc prices
  this.tokenBuyPrice = _nextBuyPrice.call(this, this.tokenLedgerCount)
  this.tokenSellPrice = _sellPrice.call(this)

  // record transaction
  this.tokenHistory.push({
    type: 'burn',
    timestamp: new Date(),
    purchase: {
      userAddress: userAddress,
      isSelf: userAddress === this._id.toHexString(),
      numberOfTokens: numberOfTokens
    },
    buyPrice: this.tokenBuyPrice,
    sellPrice: this.tokenSellPrice
  })
}

ContractSchema.methods.drain = function(amount) {

  // Check that contract allows drain
  if(!this.contractOptions.ownerCanDrain){
    throw {
      clientError: true,
      status: 400,
      message: 'contract: not allowed'
    }
  }

  // update token ledger escrow balance
  this.contractEscrowBalance = this.contractEscrowBalance - amount

  // Calc new prices
  this.tokenBuyPrice = _nextBuyPrice.call(this, this.tokenLedgerCount)
  this.tokenSellPrice = _sellPrice.call(this)

  // record transaction
  this.tokenHistory.push({
    type: 'drain',
    timestamp: new Date(),
    purchase: {
      amount: amount
    },
    buyPrice: this.tokenBuyPrice,
    sellPrice: this.tokenSellPrice
  })
}

// Convenience methods
ContractSchema.methods.getTokenCountByUser = function(userAddress) {
  const ownerLedgerEntryIndex = this.tokenLedger.findIndex(item => item.user.toHexString() == userAddress);
  if(ownerLedgerEntryIndex > -1){
    return this.tokenLedger[ownerLedgerEntryIndex].tokenCount
  }
  return 0
}

ContractSchema.methods.getKey = function(userAddress) {
  const ownerLedgerEntryIndex = this.tokenLedger.findIndex(item => item.user.toHexString() == userAddress);
  if(ownerLedgerEntryIndex > -1){
    return this.key
  }
  return null
}


ContractSchema.methods.getPurchaseTotal = function(numberOfTokens) {
  return _purchaseTotal.call(this, numberOfTokens)
}

ContractSchema.methods.getSaleTotal = function(numberOfTokens) {
  return _purchaseTotal.call(this, numberOfTokens)
}



// -----------------

function _sellPrice(){
  if(this.tokenLedgerCount === 0) return 0
  return utils.round((this.contractEscrowBalance / this.tokenLedgerCount), 4)
}

function _saleTotal(numberOfTokens){
  if(this.tokenLedgerCount === 0 || numberOfTokens === 0) return 0
  return utils.round((this.contractEscrowBalance / this.tokenLedgerCount) * numberOfTokens, 4)
}

function _nextBuyPrice(tokenSupply){
  if(this.contractOptions.exponent > 0){
    return utils.round(
      this.contractOptions.tokenBasePrice +
      (Math.pow(tokenSupply + 1, this.contractOptions.exponent) / this.contractOptions.exponentDivisor), 4)
  } else {
    return this.contractOptions.tokenBasePrice
  }
}

function _purchaseTotal(numberOfTokens){

  let total = 0
  for(let i = 0; i < numberOfTokens; i++){

    // y = 10 + (x^2 / 10,000)
    total = total + _nextBuyPrice.call(this, this.tokenLedgerCount + i)
  }

  return total
}


module.exports = mongoose.model('Contract', ContractSchema);
