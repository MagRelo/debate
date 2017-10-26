'use strict';

var pricingFunctions = require('../config/pricing')
var utils = require('../config/utils')

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  timestamp: Date,
  avatarUrl: String,
  balance: Number,
  tokenLedger: Object,
  tokenLedgerCount: Number,
  tokenLedgerEscrowBalance: Number,
  wallet: Object,
  tokenHistory: Array
});

UserSchema.methods.ownedTokenCount = function(ownerAddress) {
  return this.tokenLedger[ownerAddress] || 0
}

UserSchema.methods.createAndAssignNewTokens = function(ownerAddress, numberOfTokens, purchasePrice) {

  // create tokens in ledger
  const tempLedgerObject = this.toObject().tokenLedger
  if(tempLedgerObject[ownerAddress]){
    tempLedgerObject[ownerAddress] = tempLedgerObject[ownerAddress] + numberOfTokens
  } else {
    tempLedgerObject[ownerAddress] = numberOfTokens
  }
  this.tokenLedger = tempLedgerObject

  // update token ledger escrow balance
  this.tokenLedgerEscrowBalance = this.tokenLedgerEscrowBalance + purchasePrice

  // update token ledger token count
  this.tokenLedgerCount = this.tokenLedgerCount + numberOfTokens

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
    salePriceOfCurrentToken: pricingFunctions.currentTokenPrice(this.tokenLedgerCount, this.tokenLedgerEscrowBalance)
  })

}

UserSchema.methods.destroyTokens = function(ownerAddress, numberOfTokens, purchasePrice) {

  const tempLedgerObject = this.toObject().tokenLedger

  // decrease token balance in ledger
  tempLedgerObject[ownerAddress] = tempLedgerObject[ownerAddress] - numberOfTokens

  // remove address if balance is zero
  if(tempLedgerObject[ownerAddress] === 0){
    delete tempLedgerObject[ownerAddress]
  }
  this.tokenLedger = tempLedgerObject

  // update token ledger escrow balance
  this.tokenLedgerEscrowBalance = this.tokenLedgerEscrowBalance - purchasePrice

  // update token ledger token count
  this.tokenLedgerCount = this.tokenLedgerCount - numberOfTokens


  // record transaction
  this.tokenHistory.push({
    type: 'destroy',
    timestamp: new Date(),
    purchase: {
      ownerAddress: ownerAddress,
      isSelf: ownerAddress === this._id.toHexString(),
      numberOfTokens: numberOfTokens,
      purchasePrice: purchasePrice,
    },
    // contractStatus: this.toObject(),
    priceOfNextToken: pricingFunctions.nextTokenPrice(this.tokenLedgerCount),
    salePriceOfCurrentToken: pricingFunctions.currentTokenPrice(this.tokenLedgerCount, this.tokenLedgerEscrowBalance)
  })
}

UserSchema.methods.saveToWallet = function(ownerAddress, numberOfTokens) {

  const tempLedgerObject = this.toObject().wallet
  if(tempLedgerObject[ownerAddress]){
    tempLedgerObject[ownerAddress] = tempLedgerObject[ownerAddress] + numberOfTokens
  } else {
    tempLedgerObject[ownerAddress] = numberOfTokens
  }
  this.wallet = tempLedgerObject
}

UserSchema.methods.removeFromWallet = function(ownerAddress, numberOfTokens) {

  const tempLedgerObject = this.toObject().wallet

  // decrease balance
  tempLedgerObject[ownerAddress] = tempLedgerObject[ownerAddress] - numberOfTokens

  // remove address if balance is zero
  if(tempLedgerObject[ownerAddress] === 0){
    delete tempLedgerObject[ownerAddress]
  }
  this.wallet = tempLedgerObject
}

module.exports = mongoose.model('User', UserSchema);
