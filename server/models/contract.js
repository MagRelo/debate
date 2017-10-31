'use strict';

// var pricingFunctions = require('../config/pricing')
var utils = require('../config/utils')

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContractSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  contractOptions: {
    tokenBasePrice: {type: Number, required: true},
    exponent: {type: Number, required: true},
    exponentDivisor: {type: Number, required: true},
    ownerCanDrain: {type: Boolean, required: true}
  },
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

  // Calc purchase price
  const tokenBasePrice = this.contractOptions.tokenBasePrice
  const exponent = this.contractOptions.exponent
  const exponentDivisor = this.contractOptions.exponentDivisor

  let tokenPurchaseCost = 0
  for(let i = 0; i < numberOfTokens; i++){

    // y = 10 + (x^2 / 10,000)
    tokenPurchaseCost = tokenPurchaseCost + utils.round(tokenBasePrice + (Math.pow(this.tokenLedgerCount + 1, exponent) / exponentDivisor), 4)
  }

  // Check that payment is greater than token price
  if(payment < tokenPurchaseCost){
    throw {
      clientError: true,
      status: 400,
      message: 'payment is less than cost'
    }
  }


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

  // update token ledger token count & prices
  this.tokenLedgerCount = this.tokenLedgerCount + numberOfTokens

  this.tokenBuyPrice = utils.round(tokenBasePrice + (Math.pow(this.tokenLedgerCount + numberOfTokens, exponent) / exponentDivisor), 4),
  this.tokenSellPrice = utils.round((this.contractEscrowBalance / this.tokenLedgerCount + numberOfTokens), 4)

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
    // contractStatus: this.toObject(),
    buyPrice: this.tokenBuyPrice,
    sellPrice: this.tokenSellPrice
  })

}

ContractSchema.methods.sell = function(userAddress, numberOfTokens) {

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

  // update ledger array object
  ledgerObj.tokenCount = ledgerObj.tokenCount - parseInt(numberOfTokens, 10)

  // delete, if needed
  if(ledgerObj.tokenCount - parseInt(numberOfTokens, 10) > 0){

    // update
    this.tokenLedger[ownerLedgerEntryIndex] = ledgerObj

  } else {

    // remove
    this.tokenLedger.splice([ownerLedgerEntryIndex], 1)
  }



  // update token ledger escrow balance
  this.contractEscrowBalance = this.contractEscrowBalance - utils.round((this.contractEscrowBalance / this.tokenLedgerCount) * numberOfTokens, 4)

  // update token ledger token count
  this.tokenLedgerCount = this.tokenLedgerCount - numberOfTokens


  // Calc prices
  const tokenBasePrice = this.contractOptions.tokenBasePrice
  const exponent = this.contractOptions.exponent
  const exponentDivisor = this.contractOptions.exponentDivisor
  this.tokenBuyPrice = utils.round(tokenBasePrice + (Math.pow(this.tokenLedgerCount - numberOfTokens, exponent) / exponentDivisor), 4),
  this.tokenSellPrice = utils.round((this.contractEscrowBalance / this.tokenLedgerCount - numberOfTokens), 4)


  // record transaction
  this.tokenHistory.push({
    type: 'sell',
    timestamp: new Date(),
    purchase: {
      userAddress: userAddress,
      isSelf: userAddress === this._id.toHexString(),
      numberOfTokens: numberOfTokens
    },
    // contractStatus: this.toObject(),
    buyPrice: this.tokenBuyPrice,
    sellPrice: this.tokenSellPrice
  })
}


ContractSchema.methods.burn = function(userAddress, numberOfTokens, payment) {

  // update ledger array
  const ownerLedgerEntryIndex = this.tokenLedger.findIndex(x => x.user.toHexString() == userAddress);
  const ledgerObj = this.tokenLedger[ownerLedgerEntryIndex]
  ledgerObj.tokenCount = ledgerObj.tokenCount - parseInt(numberOfTokens, 10)
  this.tokenLedger[ownerLedgerEntryIndex] = ledgerObj

  // update token ledger token count
  this.tokenLedgerCount = this.tokenLedgerCount - numberOfTokens

  // record transaction
  this.tokenHistory.push({
    type: 'burn',
    timestamp: new Date(),
    purchase: {
      userAddress: userAddress,
      isSelf: userAddress === this._id.toHexString(),
      numberOfTokens: numberOfTokens,
      payment: payment,
    },
    // contractStatus: this.toObject(),
    priceOfNextToken: pricingFunctions.nextTokenPrice(this.tokenLedgerCount),
    tokenBuyPrice: pricingFunctions.currentTokenPrice(this.tokenLedgerCount, this.contractEscrowBalance)
  })
}

ContractSchema.methods.drain = function(userAddress, numberOfTokens, payment) {

  // update ledger array
  const ownerLedgerEntryIndex = this.tokenLedger.findIndex(x => x.user.toHexString() == userAddress);
  const ledgerObj = this.tokenLedger[ownerLedgerEntryIndex]
  ledgerObj.tokenCount = ledgerObj.tokenCount - parseInt(numberOfTokens, 10)
  this.tokenLedger[ownerLedgerEntryIndex] = ledgerObj

  // update token ledger token count
  this.tokenLedgerCount = this.tokenLedgerCount - numberOfTokens

  // record transaction
  this.tokenHistory.push({
    type: 'burn',
    timestamp: new Date(),
    purchase: {
      userAddress: userAddress,
      isSelf: userAddress === this._id.toHexString(),
      numberOfTokens: numberOfTokens,
      payment: payment,
    },
    // contractStatus: this.toObject(),
    priceOfNextToken: pricingFunctions.nextTokenPrice(this.tokenLedgerCount),
    tokenBuyPrice: pricingFunctions.currentTokenPrice(this.tokenLedgerCount, this.contractEscrowBalance)
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



module.exports = mongoose.model('Contract', ContractSchema);
