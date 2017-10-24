'use strict';
var stream = require('getstream-node');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StreamMongoose = stream.mongoose;

var MessageSchema = new Schema({
  created_at: Date,
  text: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

// GetStream integration
MessageSchema.plugin(stream.mongoose.activity);

module.exports = mongoose.model('Message', MessageSchema);
