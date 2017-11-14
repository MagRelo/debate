'use strict';

// Staging specific configuration
// =================================
module.exports = {

  // Server IP
  ip:       process.env.IP || undefined,

  // Server port
  port:     process.env.PORT || 8080,

  // MongoDB connection options
  mongo: {
    uri:   'mongodb://' + process.env.MONGODB_ADDRESS_INT + '/' + process.env.MONGODB_DATABASE
  },

  elasticSearch_HOST : process.env.ELASTICSEARCH_ADDRESS_INT,
  elasticSearch_PORT : '9200',

  twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY,
  twitterSecret: process.env.TWITTER_SECRET

};
