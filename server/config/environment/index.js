'use strict';

var path = require('path');
var _ = require('lodash');

// function requiredProcessEnv(name) {
//   if(!process.env[name]) {
//     throw new Error('You must set the ' + name + ' environment variable');
//   }
//   return process.env[name];
// }

// All configurations will extend these options
// ============================================

var all = {

  //Server
  stackName: process.env.STACK_NAME || 'local',
  serverName: process.env.SERVER_NAME || 'local',

  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: 'false',

  // List of user roles
  userRoles: [
    'user',
    'admin'
  ],

  // MongoDB connection options
  mongo: {
    options: {
      useMongoClient: true
    }
  },

  // ElasticSearch
  elasticSearch_excludeIDs: process.env.ELASTICSEARCH_EXCLUDEIDS || '',
  collectAnalytics: process.env.COLLECT_ANALYTICS || false,

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {}
);
