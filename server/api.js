/**
 * Main application routes
 */

const userController = require('./controllers/user')
const messageController = require('./controllers/message')
const contractController = require('./controllers/contract')

'use strict';
var path = require('path');

module.exports = function(app) {

  // *USERS*
  app.post('/api/user/list', userController.listUsers);
  app.get('/api/user/:userId', userController.getUser);
  app.post('/api/user', userController.saveUser);

  // *FOLLOW*
  app.post('/api/follow', userController.purchaseTokens);
  app.delete('/api/follow', userController.sellTokens);

  // *CONTRACTS*
  app.post('/api/contract/create', contractController.createContract);

  app.put('/api/contract/buy', contractController.buyTokens);
  app.put('/api/contract/sell', contractController.sellTokens);
  app.put('/api/contract/burn', contractController.burnTokens);
  app.put('/api/contract/drain', contractController.drainEscrow);


  // * MESSAGES*
  app.get('/api/messages/:userId', messageController.getMessagesByUser);
  app.get('/api/timeline/:userId', messageController.getTimelineByUser);
  app.post('/api/messages', messageController.saveMessage);


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
