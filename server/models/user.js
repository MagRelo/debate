'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  timestamp: Date,
  avatarUrl: String,
  balance: Number,
  escrowBalance: Number,
  tokenSupply: Number,
  tokenLedger: Object,
  wallet: Object,
  tokenHistory: Array
});

UserSchema.methods.ownedTokenCount = function(ownerAddress) {
  return this.tokenLedger[ownerAddress] || 0
}

UserSchema.methods.createAndAssignNewTokens = function(ownerAddress, numberOfTokens) {

  // create tokens in ledger
  const tempLedgerObject = this.toObject().tokenLedger
  if(tempLedgerObject[ownerAddress]){
    tempLedgerObject[ownerAddress] = tempLedgerObject[ownerAddress] + numberOfTokens
  } else {
    tempLedgerObject[ownerAddress] = numberOfTokens
  }
  this.tokenLedger = tempLedgerObject

  this.tokenSupply = this.tokenSupply + numberOfTokens
}

UserSchema.methods.destroyTokens = function(ownerAddress, numberOfTokens) {

  const tempLedgerObject = this.toObject().tokenLedger

  // decrease balance
  tempLedgerObject[ownerAddress] = tempLedgerObject[ownerAddress] - numberOfTokens

  // remove address if balance is zero
  if(tempLedgerObject[ownerAddress] === 0){
    delete tempLedgerObject[ownerAddress]
  }
  this.tokenLedger = tempLedgerObject

  this.tokenSupply = this.tokenSupply - numberOfTokens
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
