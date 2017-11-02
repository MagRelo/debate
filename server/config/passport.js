var passport = require('passport'),
  TwitterTokenStrategy = require('passport-twitter-token'),
  User = require('mongoose').model('User')

const twitterConsumerKey = 'a9nNKuouyFRamZSZyUtvRbkGl'
const twitterSecret = 'Ep9QTjcv5R4ry5py34Q4FjPlytahPMPABnGmGA293V4omVNVYE'


module.exports = function () {

  passport.use(new TwitterTokenStrategy({
      consumerKey: twitterConsumerKey,
      consumerSecret: twitterSecret,
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
