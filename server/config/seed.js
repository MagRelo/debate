/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
const mongoose = require('mongoose');
const User = require('../models/user') ;

const BenId = mongoose.Types.ObjectId("56a3e4661f46c422ef8bac61")
const ToddId = mongoose.Types.ObjectId("56a3e4661f46c422ef8bad42")
const GrodeId = mongoose.Types.ObjectId("56a3e4661f46c422ef8bae32")
const MattId = mongoose.Types.ObjectId("56a3fc84898cf1bbf055cd5a")

User.find({}).remove()
  .then(() => {

    console.log('seeding database')

    User.create(
      {
        _id: BenId,
        provider: 'local',
        name: 'ben',
        email: 'ben',
        password: 'ben',
        avatarUrl: ''
      },
      {
        _id: ToddId,
        provider: 'local',
        name: 'todd',
        email: 'todd',
        password: 'todd',
        avatarUrl: ''
      },
      {
        _id: GrodeId,
        provider: 'local',
        name: 'grode',
        email: 'grode',
        password: 'grode',
        avatarUrl: ''
      },
      {
        _id: MattId,
        provider: 'local',
        role: 'admin',
        name: 'matt',
        email: 'matt',
        password: 'matt',
        avatarUrl: ''
      }
    )
    .then(() => {
      console.log('finished populating users');
    });
  });
