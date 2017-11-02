const fetch = require('request')

const passport = require('passport')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const UserModel = require('../models/user')

const twitterConsumerKey = 'a9nNKuouyFRamZSZyUtvRbkGl'
const twitterSecret = 'Ep9QTjcv5R4ry5py34Q4FjPlytahPMPABnGmGA293V4omVNVYE'


exports.getTwitterRequestToken = (request, response) => {

    fetch.post({
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
        consumer_key: twitterConsumerKey,
        consumer_secret: twitterSecret
      }
    }, function (err, r, body) {
      if (err) {
        return response.send(500, { message: e.message });
      }


      var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      response.send(JSON.parse(jsonStr));
    });

}

exports.twitterLogin = (request, response, next) => {

  fetch.post({
     url: 'https://api.twitter.com/oauth/access_token?oauth_verifier',
     oauth: {
       consumer_key: twitterConsumerKey,
       consumer_secret: twitterSecret,
       token: request.query.oauth_token
     },
     form: { oauth_verifier: request.query.oauth_verifier }
   }, function (err, r, body) {
     if (err) {
       return response.send(500, { message: err.message });
     }

     const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
     const parsedBody = JSON.parse(bodyString);

     request.body['oauth_token'] = parsedBody.oauth_token;
     request.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
     request.body['user_id'] = parsedBody.user_id;

     next();
   });

}
