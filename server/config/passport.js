var passport = require('passport'),
  TwitterTokenStrategy = require('passport-twitter-token'),
  User = require('mongoose').model('User')

const config = require('./environment')

module.exports = function () {

  passport.use(new TwitterTokenStrategy({
      consumerKey: config.twitterConsumerKey,
      consumerSecret: config.twitterSecret,
      includeEmail: true,
      includeStatus: true,
      includeEntities: true
    },
    function (token, tokenSecret, profile, done) {
      User.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
        return done(err, user);
      });
    }));

};
