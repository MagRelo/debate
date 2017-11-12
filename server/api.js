/**
 * Main application routes
 */



const authController = require('./controllers/auth')
const userController = require('./controllers/user')
const messageController = require('./controllers/message')
const contractController = require('./controllers/contract')
const analyticsController = require('./controllers/analytics')

const passport = require('passport')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

var path = require('path');

//setup configuration for twitter login
var passportConfig = require('./config/passport');
passportConfig();


var getOne = function (req, res) {
  var user = req.user.toObject();

  delete user['twitterProvider'];
  delete user['__v'];

  res.json(user);
};


module.exports = function(app) {

  // TWITTER LOGIN
  app.post('/api/v1/auth/twitter/reverse', authController.getTwitterRequestToken)
  // app.get('/auth/twitter', [
  //   authController.twitterLogin,
  //   passport.authenticate('twitter-token', {session: false}),
  //   function(req, res, next) {
  //       if (!req.user) { return res.send(401, 'User Not Authenticated'); }
  //       req.auth = { id: req.user.id }
  //       return next();
  //     },
  //   authController.generateToken,
  //   authController.sendToken
  // ])
  //
  app.post('/auth/twitter', [
    authController.twitterLogin,
    passport.authenticate('twitter-token', {session: false}),
    function(req, res, next) {
        if (!req.user) { return res.send(401, 'User Not Authenticated'); }
        req.auth = { id: req.user.id }
        return next();
      },
    authController.generateToken,
    authController.sendToken
  ])


  // USERS
  app.post('/api/user/list', userController.listUsers);
  app.post('/api/user/create', userController.saveUser);

  // CONTRACTS PUBLIC
  app.post('/api/contract/search', contractController.searchContracts);
  app.get('/api/contract/list', contractController.listContracts);
  app.get('/api/contract/:contractId', contractController.getContract);

// CONTRACTS AUTH
  app.post('/api/contract/create', [
    authController.authenticate,
    contractController.createContract
  ]);
  app.put('/api/contract/buy', [
    authController.authenticate,
    contractController.buyTokens
  ]);
  app.put('/api/contract/sell', [
    authController.authenticate,
    contractController.sellTokens
  ]);
  app.put('/api/contract/burn', [
    authController.authenticate,
    contractController.burnTokens
  ]);
  app.put('/api/contract/drain', [
    authController.authenticate,
    contractController.drainEscrow
  ]);

  // *FOLLOW*
  // app.post('/api/follow', userController.purchaseTokens);
  // app.delete('/api/follow', userController.sellTokens);

  // * MESSAGES*
  app.get('/api/messages/:userId', messageController.getMessagesByUser);
  app.get('/api/timeline/:userId', messageController.getTimelineByUser);
  app.post('/api/messages', messageController.saveMessage);


  // *ANALYTICS*
  app.post('/api/analytics/send', analyticsController.sendEvent);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get((request, response)=>{
     response.status(404).send()
   });

  // All other routes should redirect to the index.html
  app.get('/*', function(req, res){
    res.sendFile('index.html', { root: './build_webpack'});
  });

};
