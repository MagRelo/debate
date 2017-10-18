/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
const mongoose = require('mongoose');
const User = require('../models/user') ;

User.find({}).remove()
  .then(() => {

    console.log('seeding database')

    User.create(
      {
        _id: mongoose.Types.ObjectId("56a3e4661f46c422ef8bac61"),
        provider: 'local',
        name: 'ben',
        email: 'ben',
        password: 'ben',
        avatarUrl: 'https://goo.gl/images/6yhQ4T'
      },
      {
        _id: mongoose.Types.ObjectId("56a3e4661f46c422ef8bad42"),
        provider: 'local',
        name: 'todd',
        email: 'todd',
        password: 'todd',
        avatarUrl: 'https://goo.gl/images/oSX8pk'
      },
      {
        _id: mongoose.Types.ObjectId("56a3e4661f46c422ef8bae32"),
        provider: 'local',
        name: 'grode',
        email: 'grode',
        password: 'grode',
        avatarUrl: 'https://goo.gl/images/as2KN9'
      },
      {
        _id: mongoose.Types.ObjectId("56a3fc84898cf1bbf055cd5a"),
        provider: 'local',
        role: 'admin',
        name: 'matt',
        email: 'matt',
        password: 'matt',
        avatarUrl: 'https://c1.staticflickr.com/2/1252/1484545713_a6477d339e_b.jpg'
      }
    )
    .then(() => {
      console.log('finished populating users');
    });
  });
