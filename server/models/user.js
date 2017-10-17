'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: Number,
  name: String,
  timestamp: Date,
  messages: Array,
  avatarUrl: String
});

module.exports = mongoose.model('User', UserSchema);
