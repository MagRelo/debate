/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

const moment = require('moment')

'use strict';
const mongoose = require('mongoose');

// Models
const User = require('../../models/user') ;
const Follow = require('../../models/follow') ;
const Message = require('../../models/message') ;

const pricingFunctions = require('../pricing')

Message.find({}).remove()
  .then(() => {
    console.log('messages deleted')
  });

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
        name: 'ben',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Location_of_%22We_Thank_Thee_O_God%22_inscription_-_panoramio.jpg/320px-Location_of_%22We_Thank_Thee_O_God%22_inscription_-_panoramio.jpg',
        balance: 1000,
        tokenLedgerEscrowBalance: 100,
        tokenLedgerCount: 10,
        tokenLedger:{
          "56a3e4661f46c422ef8bac61": 10
        },
        wallet: {
          "56a3e4661f46c422ef8bac61": 10
        },
        tokenHistory: [
          {
            name: moment().format("M/D"),
            tokenLedgerCount: 0,
            priceOfNextToken: pricingFunctions.nextTokenPrice(10),
            salePriceOfCurrentToken: pricingFunctions.currentTokenPrice(10, 100)
          },
          {
            name: moment().format("M/D"),
            tokenLedgerCount: 0,
            priceOfNextToken: pricingFunctions.nextTokenPrice(10),
            salePriceOfCurrentToken: pricingFunctions.currentTokenPrice(10, 100)
          },
          {
            name: moment().format("M/D"),
            tokenLedgerCount: 0,
            priceOfNextToken: pricingFunctions.nextTokenPrice(10),
            salePriceOfCurrentToken: pricingFunctions.currentTokenPrice(10, 100)
          },
          {
            name: moment().format("M/D"),
            tokenLedgerCount: 0,
            priceOfNextToken: pricingFunctions.nextTokenPrice(10),
            salePriceOfCurrentToken: pricingFunctions.currentTokenPrice(10, 100)
          }
        ]

      },
      {
        _id: mongoose.Types.ObjectId("56a3e4661f46c422ef8bad42"),
        name: 'todd',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Haltern_am_See%2C_Seebucht_Hohe_Niemen_--_2014_--_1152.jpg/320px-Haltern_am_See%2C_Seebucht_Hohe_Niemen_--_2014_--_1152.jpg',
        balance: 1000,
        tokenLedgerEscrowBalance: 100,
        tokenLedgerCount: 10,
        tokenLedger: {
          "56a3e4661f46c422ef8bad42": 10
        },
        wallet: {
          "56a3e4661f46c422ef8bad42": 10
        },
        tokenHistory: [
          {
            name: moment().format("M/D"),
            tokenLedgerCount: 1,
            priceOfNextToken: pricingFunctions.nextTokenPrice(1),
            salePriceOfCurrentToken: pricingFunctions.currentTokenPrice(1, 10)
          },
          {
            name: moment().format("M/D"),
            tokenLedgerCount: 1,
            priceOfNextToken: pricingFunctions.nextTokenPrice(40),
            salePriceOfCurrentToken: pricingFunctions.currentTokenPrice(40, 410)
          },
          {
            name: moment().format("M/D"),
            tokenLedgerCount: 1,
            priceOfNextToken: pricingFunctions.nextTokenPrice(410),
            salePriceOfCurrentToken: pricingFunctions.currentTokenPrice(410, 4700)
          },
          {
            name: moment().format("M/D"),
            tokenLedgerCount: 1,
            priceOfNextToken: pricingFunctions.nextTokenPrice(100),
            salePriceOfCurrentToken: pricingFunctions.currentTokenPrice(100, 1200)
          }
        ]
      },
      {
        _id: mongoose.Types.ObjectId("56a3fc84898cf1bbf055cd5a"),
        name: 'matt',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/M%C3%BCnster%2C_St.-Paulus-Dom_--_2014_--_0323.jpg/320px-M%C3%BCnster%2C_St.-Paulus-Dom_--_2014_--_0323.jpg',
        balance: 1000,
        tokenLedgerEscrowBalance: 100,
        tokenLedgerCount: 10,
        tokenLedger: {
          "56a3fc84898cf1bbf055cd5a": 10
        },
        wallet: {
          "56a3fc84898cf1bbf055cd5a": 10
        },
        tokenHistory: [
          {
            name: moment().format("M/D"),
            tokenLedgerCount: 1,
            priceOfNextToken: pricingFunctions.nextTokenPrice(1),
            salePriceOfCurrentToken: pricingFunctions.currentTokenPrice(1, 10)
          },
          {
            name: moment().format("M/D"),
            tokenLedgerCount: 1,
            priceOfNextToken: pricingFunctions.nextTokenPrice(40),
            salePriceOfCurrentToken: pricingFunctions.currentTokenPrice(40, 410)
          },
          {
            name: moment().format("M/D"),
            tokenLedgerCount: 1,
            priceOfNextToken: pricingFunctions.nextTokenPrice(410),
            salePriceOfCurrentToken: pricingFunctions.currentTokenPrice(410, 4700)
          },
          {
            name: moment().format("M/D"),
            tokenLedgerCount: 1,
            priceOfNextToken: pricingFunctions.nextTokenPrice(1000),
            salePriceOfCurrentToken: pricingFunctions.currentTokenPrice(1000, 12000)
          }
        ]
      }
    )
    .then(() => {
      console.log('finished populating users');

      return Follow.create(
        {user: mongoose.Types.ObjectId("56a3e4661f46c422ef8bac61"), target: mongoose.Types.ObjectId("56a3e4661f46c422ef8bac61")},
        {user: mongoose.Types.ObjectId("56a3e4661f46c422ef8bad42"), target: mongoose.Types.ObjectId("56a3e4661f46c422ef8bad42")},
        {user: mongoose.Types.ObjectId("56a3fc84898cf1bbf055cd5a"), target: mongoose.Types.ObjectId("56a3fc84898cf1bbf055cd5a")}
      )

    }).then(() => {
      console.log('finished populating follows');
    });
  });


// Follow.create(
//   {user: mongoose.Types.ObjectId("56a3e4661f46c422ef8bac61"), target: mongoose.Types.ObjectId("56a3e4661f46c422ef8bac61")},
//   {user: mongoose.Types.ObjectId("56a3e4661f46c422ef8bad42"), target: mongoose.Types.ObjectId("56a3e4661f46c422ef8bad42")},
//   {user: mongoose.Types.ObjectId("56a3fc84898cf1bbf055cd5a"), target: mongoose.Types.ObjectId("56a3fc84898cf1bbf055cd5a")}
// ).then(()=>{
//   console.log('finished populating follows');
// })
