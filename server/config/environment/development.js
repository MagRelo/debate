'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options

  // mongo: {
  //   uri: 'mongodb://<IP>:27017/'
  // },

  mongo: {
    uri: 'mongodb://localhost:27017/notLinkedin'
  },


  elasticSearch_HOST : '198.211.105.115',
  elasticSearch_PORT : '9200',


  twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY || 'a9nNKuouyFRamZSZyUtvRbkGl',
  twitterSecret: process.env.TWITTER_SECRET || 'Ep9QTjcv5R4ry5py34Q4FjPlytahPMPABnGmGA293V4omVNVYE'


};
