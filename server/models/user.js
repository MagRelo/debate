'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  timestamp: Date,
  avatarUrl: String
});

module.exports = mongoose.model('User', UserSchema);
