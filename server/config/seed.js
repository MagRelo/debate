/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
const mongoose = require('mongoose');
const User = require('../models/user') ;
const Follow = require('../models/follow') ;


Follow.find({}).remove()
  .then(() => {
    console.log('follows deleted')
  });


User.find({}).remove()
  .then(() => {

    console.log('seeding database')

    User.create(
      {
        _id: mongoose.Types.ObjectId("56a3e4661f46c422ef8bac61"),
        balance: 1000,
        name: 'ben',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Location_of_%22We_Thank_Thee_O_God%22_inscription_-_panoramio.jpg/320px-Location_of_%22We_Thank_Thee_O_God%22_inscription_-_panoramio.jpg'
      },
      {
        _id: mongoose.Types.ObjectId("56a3e4661f46c422ef8bad42"),
        balance: 1000,
        name: 'todd',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Haltern_am_See%2C_Seebucht_Hohe_Niemen_--_2014_--_1152.jpg/320px-Haltern_am_See%2C_Seebucht_Hohe_Niemen_--_2014_--_1152.jpg'
      },
      {
        _id: mongoose.Types.ObjectId("56a3fc84898cf1bbf055cd5a"),
        balance: 1000,
        name: 'matt',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/M%C3%BCnster%2C_St.-Paulus-Dom_--_2014_--_0323.jpg/320px-M%C3%BCnster%2C_St.-Paulus-Dom_--_2014_--_0323.jpg'
      }
    )
    .then(() => {
      console.log('finished populating users');
    });
  });
