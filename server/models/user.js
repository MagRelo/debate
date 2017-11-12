'use strict';

var pricingFunctions = require('../config/pricing')
var utils = require('../config/utils')

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  username: String,
  avatarUrl: String,
  email: { type: String, trim: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
  twitterProvider: { type: { id: String, token: String }, select: false },
  balance: {type: Number, default: 10000},
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

// schema ----

UserSchema.statics.upsertTwitterUser = function(token, tokenSecret, profile, cb) {
  var that = this;

  return this.findOne({ 'twitterProvider.id': profile.id }, function(err, user) {

    // no user was found, lets create a new one
    if (!user) {
      var newUser = new that({
        avatarUrl: profile.photos[0].value,
        email: profile.emails[0].value,
        name: profile.displayName,
        username: profile.username,
        twitterProvider: {
          id: profile.id,
          token: token,
          tokenSecret: tokenSecret
        }
      });

      newUser.save(function(error, savedUser) {
        if (error) { console.log(error); }

        return cb(error, savedUser);
      });

    } else {

      return cb(err, user);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
