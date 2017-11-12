/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
'use strict';

const moment = require('moment')
const mongoose = require('mongoose');
const fetch = require('request')

const config = require('../environment')

// Models
const User = require('../../models/user') ;
const Follow = require('../../models/follow') ;
const Message = require('../../models/message') ;
const Contract = require('../../models/contract') ;

fetch.delete({
  url: 'http://' + config.elasticSearch_HOST + ':' + config.elasticSearch_PORT + '/contracts/'
}, function (err, r, body) {
  console.log('elastic contracts emptied:', r.statusCode)
});
fetch.delete({
  url: 'http://' + config.elasticSearch_HOST + ':' + config.elasticSearch_PORT + '/analytics/'
}, function (err, r, body) {
  console.log('elastic analytics emptied:', r.statusCode)
});

Contract.find({}).remove().then(() => { console.log('contract deleted') });
Follow.find({}).remove().then(() => { console.log('follows deleted') });
Message.find({}).remove().then(() => { console.log('messages deleted') });

User.find({}).remove()
  .then(() => {

    console.log('seeding database')

    User.create(
      {
        _id: mongoose.Types.ObjectId("5a0602782484c600a3ec6168"),
        name: 'Ken Tremendous',
        email: '1@a.com',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Location_of_%22We_Thank_Thee_O_God%22_inscription_-_panoramio.jpg/320px-Location_of_%22We_Thank_Thee_O_God%22_inscription_-_panoramio.jpg',
        balance: 10000,
        tokenLedgerEscrowBalance: 0,
        tokenLedgerCount: 0,
        tokenLedger:{},
        wallet: {},
        tokenHistory: []

      },
      // {
      //   _id: mongoose.Types.ObjectId("56a3e4661f46c422ef8bad42"),
      //   name: 'Matt Lovan',
      //   email: '2@a.com',
      //   avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Haltern_am_See%2C_Seebucht_Hohe_Niemen_--_2014_--_1152.jpg/320px-Haltern_am_See%2C_Seebucht_Hohe_Niemen_--_2014_--_1152.jpg',
      //   balance: 10000000,
      //   tokenLedgerEscrowBalance: 0,
      //   tokenLedgerCount: 0,
      //   tokenLedger: {},
      //   wallet: {},
      //   tokenHistory: []
      // },
      // {
      //   _id: mongoose.Types.ObjectId("56a3fc84898cf1bbf055cd5a"),
      //   name: 'Nichol Alexander',
      //   email: '3@a.com',
      //   avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/M%C3%BCnster%2C_St.-Paulus-Dom_--_2014_--_0323.jpg/320px-M%C3%BCnster%2C_St.-Paulus-Dom_--_2014_--_0323.jpg',
      //   balance: 1000,
      //   tokenLedgerEscrowBalance: 0,
      //   tokenLedgerCount: 0,
      //   tokenLedger: {},
      //   wallet: {},
      //   tokenHistory: []
      // }
    ).then(()=>{

      // Contract.create({
      //   _id: mongoose.Types.ObjectId("59f8b84b86a4e6853976ef60"),
      //   owner: mongoose.Types.ObjectId("56a3e4661f46c422ef8bac61"),
      //   contractOptions: {
      //     name: 'test1',
      //     tokenBasePrice: 10,
      //     exponent: 2,
      //     exponentDivisor: 10000,
      //     ownerCanDrain: true,
      //     ownerCanBurn: true
      //   },
      //   timestamp: new Date()
      // })

    })

    // .then(() => {
    //   console.log('finished populating users');
    //
    //   return Follow.create(
    //     {user: mongoose.Types.ObjectId("56a3e4661f46c422ef8bac61"), target: mongoose.Types.ObjectId("56a3e4661f46c422ef8bac61")},
    //     {user: mongoose.Types.ObjectId("56a3e4661f46c422ef8bad42"), target: mongoose.Types.ObjectId("56a3e4661f46c422ef8bad42")},
    //     {user: mongoose.Types.ObjectId("56a3fc84898cf1bbf055cd5a"), target: mongoose.Types.ObjectId("56a3fc84898cf1bbf055cd5a")}
    //   )
    //
    // }).then(() => {
    //   console.log('finished populating follows');
    // });
  });
