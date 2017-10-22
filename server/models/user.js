'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  timestamp: Date,
  avatarUrl: String,
  balance: Number,
  tokensOutstanding: Number,
  escrowBalance: Number,
  tokenHistory: Object
});


// add toJSON() method
UserSchema.options.toJSON = {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
};

module.exports = mongoose.model('User', UserSchema);
