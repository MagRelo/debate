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
  walletArray: [
    {
      contract: { type: Schema.Types.ObjectId, required: true, ref: 'Contract' },
      tokenCount: Number,
      totalPurchasePrice: Number
    }
  ],
  contracts: [
    { type: Schema.Types.ObjectId, required: true, ref: 'Contract' }
  ]
});

UserSchema.methods.saveToWallet = function(contractAddress, numberOfTokens, purchasePrice) {

  const ownerLedgerEntryIndex = this.walletArray.findIndex(item => item.contract.toHexString() == contractAddress);
  if(ownerLedgerEntryIndex > -1){

    // update
    const ledgerObj = this.walletArray[ownerLedgerEntryIndex]
    ledgerObj.tokenCount = ledgerObj.tokenCount + parseInt(numberOfTokens, 10)
    ledgerObj.totalPurchasePrice = ledgerObj.totalPurchasePrice + purchasePrice
    this.walletArray[ownerLedgerEntryIndex] = ledgerObj

  } else {

    // add
    this.walletArray.push({
      'contract': contractAddress,
      'tokenCount': numberOfTokens,
      'totalPurchasePrice': purchasePrice
    })
  }

}

UserSchema.methods.removeFromWallet = function(contractAddress, numberOfTokens, salePrice) {

  // update ledger array
  const ownerLedgerEntryIndex = this.walletArray.findIndex(item => item.contract.toHexString() == contractAddress);
  const ledgerObj = this.walletArray[ownerLedgerEntryIndex]
  ledgerObj.tokenCount = ledgerObj.tokenCount - numberOfTokens
  ledgerObj.totalPurchasePrice = ledgerObj.totalPurchasePrice - salePrice
  this.walletArray[ownerLedgerEntryIndex] = ledgerObj

}

module.exports = mongoose.model('User', UserSchema);
