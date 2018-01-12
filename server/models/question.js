'use strict';
var stream = require('getstream-node');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StreamMongoose = stream.mongoose;

const mongoosastic = require('mongoosastic')
const config = require('../config/environment/');

var QuestionSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  question: String,
  answerOne: String,
  answerTwo: String,
  created_at: Date,
  comments: [
    {type: Schema.Types.ObjectId, ref: 'Comment'}
  ],
  votes: []
});

// GetStream integration
// QuestionSchema.plugin(stream.mongoose.activity);

// add elastic connection
QuestionSchema.plugin(mongoosastic, {
  host: config.elasticSearch_HOST,
  port: config.elasticSearch_PORT,
  index: 'questions',
  type: 'mongo'
})


module.exports = mongoose.model('Question', QuestionSchema);
