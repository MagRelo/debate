/**
 * Main application routes
 */


const userController = require('./controllers/user')


'use strict';

// var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  app.get('/api/user', userController.saveUser);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get((request, response)=>{
     request.status(404).send()
   });

  // All other routes should redirect to the index.html
  app.get('/*', function(req, res){
    res.sendFile('index.html', { root: './build_webpack'});
  });

};