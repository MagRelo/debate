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

// add toJSON() method
MessageSchema.options.toJSON = {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
};

module.exports = mongoose.model('Message', MessageSchema);
