'use strict';

var pricingFunctions = require('../config/pricing')
var utils = require('../config/utils')

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  timestamp: Date,
  avatarUrl: String,
  balance: {type: Number, default: 0},
  wallet: Object,
  walletArray: [
    {
      user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
      tokenCount: Number,
      totalPurchasePrice: Number
    }
  ],
  tokenLedger: Object,
  tokenLedgerArray: [
    {
      user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
      tokenCount: Number,
      totalPurchasePrice: Number
    }
  ],
  tokenBuyPrice: {type: Number, default: 10},
  tokenSellPrice: {type: Number, default: 0},
  tokenLedgerCount: {type: Number, default: 0},
  tokenLedgerEscrowBalance: {type: Number, default: 0},
  tokenHistory: Array
});

UserSchema.methods.ownedTokenCount = function(ownerAddress) {
  const ownerLedgerEntryIndex = this.tokenLedgerArray.findIndex(x => x.user.toHexString() == ownerAddress);

  if(ownerLedgerEntryIndex > -1){
    return this.tokenLedgerArray[ownerLedgerEntryIndex].tokenCount
  }

  return 0
}

UserSchema.methods.createAndAssignNewTokens = function(ownerAddress, numberOfTokens, purchasePrice) {

  const ownerLedgerEntryIndex = this.tokenLedgerArray.findIndex(x => x.user.toHexString() == ownerAddress);
  if(ownerLedgerEntryIndex === -1){

    // add
    this.tokenLedgerArray.push({
      'user': ownerAddress,
      'tokenCount': numberOfTokens,
      'totalPurchasePrice': purchasePrice
    })

  } else {

    // update
    const ledgerObj = this.tokenLedgerArray[ownerLedgerEntryIndex]
    ledgerObj.tokenCount = ledgerObj.tokenCount + parseInt(numberOfTokens, 10)
    ledgerObj.totalPurchasePrice = ledgerObj.totalPurchasePrice + purchasePrice
    this.tokenLedgerArray[ownerLedgerEntryIndex] = ledgerObj

  }

  // update token ledger escrow balance
  this.tokenLedgerEscrowBalance = this.tokenLedgerEscrowBalance + purchasePrice

  // update token ledger token count & prices
  this.tokenLedgerCount = this.tokenLedgerCount + numberOfTokens
  this.tokenBuyPrice = pricingFunctions.nextTokenPrice(this.tokenLedgerCount),
  this.tokenSellPrice = pricingFunctions.currentTokenPrice(this.tokenLedgerCount, this.tokenLedgerEscrowBalance)

  // record transaction
  this.tokenHistory.push({
    type: 'create',
    timestamp: new Date(),
    purchase: {
      ownerAddress: ownerAddress,
      isSelf: ownerAddress === this._id.toHexString(),
      numberOfTokens: numberOfTokens,
      purchasePrice: purchasePrice,
    },
    // contractStatus: this.toObject(),
    priceOfNextToken: pricingFunctions.nextTokenPrice(this.tokenLedgerCount),
    tokenBuyPrice: pricingFunctions.currentTokenPrice(this.tokenLedgerCount, this.tokenLedgerEscrowBalance)
  })

}

UserSchema.methods.sellTokens = function(ownerAddress, numberOfTokens, purchasePrice) {

  // update ledger array
  const ownerLedgerEntryIndex = this.tokenLedgerArray.findIndex(x => x.user.toHexString() == ownerAddress);
  const ledgerObj = this.tokenLedgerArray[ownerLedgerEntryIndex]
  ledgerObj.tokenCount = ledgerObj.tokenCount - parseInt(numberOfTokens, 10)
  ledgerObj.totalPurchasePrice = ledgerObj.totalPurchasePrice - purchasePrice
  this.tokenLedgerArray[ownerLedgerEntryIndex] = ledgerObj

  // update token ledger escrow balance
  this.tokenLedgerEscrowBalance = this.tokenLedgerEscrowBalance - purchasePrice

  // update token ledger token count
  this.tokenLedgerCount = this.tokenLedgerCount - numberOfTokens


  // record transaction
  this.tokenHistory.push({
    type: 'sell',
    timestamp: new Date(),
    purchase: {
      ownerAddress: ownerAddress,
      isSelf: ownerAddress === this._id.toHexString(),
      numberOfTokens: numberOfTokens,
      purchasePrice: purchasePrice,
    },
    // contractStatus: this.toObject(),
    priceOfNextToken: pricingFunctions.nextTokenPrice(this.tokenLedgerCount),
    tokenBuyPrice: pricingFunctions.currentTokenPrice(this.tokenLedgerCount, this.tokenLedgerEscrowBalance)
  })
}


UserSchema.methods.burnTokens = function(ownerAddress, numberOfTokens, purchasePrice) {

  // update ledger array
  const ownerLedgerEntryIndex = this.tokenLedgerArray.findIndex(x => x.user.toHexString() == ownerAddress);
  const ledgerObj = this.tokenLedgerArray[ownerLedgerEntryIndex]
  ledgerObj.tokenCount = ledgerObj.tokenCount - parseInt(numberOfTokens, 10)
  this.tokenLedgerArray[ownerLedgerEntryIndex] = ledgerObj

  // update token ledger token count
  this.tokenLedgerCount = this.tokenLedgerCount - numberOfTokens

  // record transaction
  this.tokenHistory.push({
    type: 'burn',
    timestamp: new Date(),
    purchase: {
      ownerAddress: ownerAddress,
      isSelf: ownerAddress === this._id.toHexString(),
      numberOfTokens: numberOfTokens,
      purchasePrice: purchasePrice,
    },
    // contractStatus: this.toObject(),
    priceOfNextToken: pricingFunctions.nextTokenPrice(this.tokenLedgerCount),
    tokenBuyPrice: pricingFunctions.currentTokenPrice(this.tokenLedgerCount, this.tokenLedgerEscrowBalance)
  })
}


UserSchema.methods.saveToWallet = function(ownerAddress, numberOfTokens, purchasePrice) {

  const ownerLedgerEntryIndex = this.walletArray.findIndex(x => x.user.toHexString() == ownerAddress);
  if(ownerLedgerEntryIndex > -1){

    // update
    const ledgerObj = this.walletArray[ownerLedgerEntryIndex]
    ledgerObj.tokenCount = ledgerObj.tokenCount + parseInt(numberOfTokens, 10)
    ledgerObj.totalPurchasePrice = ledgerObj.totalPurchasePrice + purchasePrice
    this.walletArray[ownerLedgerEntryIndex] = ledgerObj

  } else {

    // add
    this.walletArray.push({
      'user': ownerAddress,
      'tokenCount': numberOfTokens,
      'totalPurchasePrice': purchasePrice
    })
  }

}

UserSchema.methods.removeFromWallet = function(ownerAddress, numberOfTokens) {

  // update ledger array
  const ownerLedgerEntryIndex = this.walletArray.findIndex(x => x.user.toHexString() == ownerAddress);
  const ledgerObj = this.walletArray[ownerLedgerEntryIndex]
  ledgerObj.tokenCount = ledgerObj.tokenCount - numberOfTokens
  this.walletArray[ownerLedgerEntryIndex] = ledgerObj

}

module.exports = mongoose.model('User', UserSchema);
