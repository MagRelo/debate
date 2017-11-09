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
    uri: 'mongodb://52.167.114.196:27017/'
  },

  // mongo: {
  //   uri: 'mongodb://localhost:27017/spoonnode-dev'
  // },

  elasticSearch_HOST : process.env.ELASTICSEARCH_ADDRESS_INT,
  elasticSearch_PORT : process.env.ELASTICSEARCH_PORT

};
