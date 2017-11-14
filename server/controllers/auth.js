const fetch = require('request-promise')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const UserModel = require('../models/user')

// const config.twitterConsumerKey = 'a9nNKuouyFRamZSZyUtvRbkGl'
// const config.twitterSecret = 'Ep9QTjcv5R4ry5py34Q4FjPlytahPMPABnGmGA293V4omVNVYE'

const config = require('../config/environment')



exports.getTwitterRequestToken = (request, response) => {

    // test
    console.log('getToken hit:', new Date())

    fetch.post({
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        oauth_callback: "http%3A%2F%2Fstake.servesa.io%2Ftwitter-callback",
        consumer_key: config.twitterConsumerKey,
        consumer_secret: config.twitterSecret
      }
    }).then((result) => {

      var jsonStr = '{ "' + result.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      response.send(JSON.parse(jsonStr));

    }).catch((e)=>{
      return response.send(500, { message: e.message });
    })

}

exports.twitterLogin = (request, response, next) => {

  // test
  console.log('twitterLogin hit:', new Date())

  fetch.post({
     url: 'https://api.twitter.com/oauth/access_token?oauth_verifier',
     oauth: {
       consumer_key: config.twitterConsumerKey,
       consumer_secret: config.twitterSecret,
       token: request.query.oauth_token
     },
     form: { oauth_verifier: request.query.oauth_verifier }
   }).then((result) => {

      const bodyString = '{ "' + result.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      const parsedBody = JSON.parse(bodyString);

      request.body['oauth_token'] = parsedBody.oauth_token;
      request.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
      request.body['user_id'] = parsedBody.user_id;

      next();

   }).catch((e)=>{
     return response.send(500, { message: e.message });
   })
 }


// Create token and send to user
exports.generateToken = function (req, res, next) {
  req.token = jwt.sign({ id: req.auth.id }, 'servesa-secret', { expiresIn: 60 * 120 });
  return next();
};
exports.sendToken = function (req, res) {
  res.setHeader('x-auth-token', req.token);
  req.user.token = req.token;
  return res.status(200).send(JSON.stringify({token: req.token, user: req.user}));
};

//token handling middleware
exports.authenticate = expressJwt({
  secret: 'servesa-secret',
  requestProperty: 'auth',
  getToken: function(req) {

    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
});
