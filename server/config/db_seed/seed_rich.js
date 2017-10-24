/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

const moment = require('moment')

'use strict';
const mongoose = require('mongoose');
const User = require('../../models/user') ;
const Follow = require('../../models/follow') ;


function nextTokenPrice(tokenSupply){
  const exponenet = 20

  return Math.floor(Math.log(tokenSupply + 1) * exponenet)
}

function currentTokenPrice(tokenSupply){
  return (Math.floor(purchasePrice(0, tokenSupply)/tokenSupply))
}
function purchasePrice(tokenSupply, numberOfTokensToPurchase){

  tokens = Array(numberOfTokensToPurchase).fill('');
  return tokens.reduce((sum, token, index)=>{
    return sum + nextTokenPrice(tokenSupply + index)
  }, 0)

}


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
        tokenSupply: 44,
        name: 'ben',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Location_of_%22We_Thank_Thee_O_God%22_inscription_-_panoramio.jpg/320px-Location_of_%22We_Thank_Thee_O_God%22_inscription_-_panoramio.jpg',
        tokenHistory: [
          {
            name: moment().format("M/D"),
            tokenSupply: 12,
            priceOfNextToken: nextTokenPrice(12),
            salePriceOfCurrentToken: currentTokenPrice(12)
          },
          {
            name: moment().format("M/D"),
            tokenSupply: 17,
            priceOfNextToken: nextTokenPrice(17),
            salePriceOfCurrentToken: currentTokenPrice(17)
          },
          {
            name: moment().format("M/D"),
            tokenSupply: 28,
            priceOfNextToken: nextTokenPrice(28),
            salePriceOfCurrentToken: currentTokenPrice(28)
          },
          {
            name: moment().format("M/D"),
            tokenSupply: 44,
            priceOfNextToken: nextTokenPrice(44),
            salePriceOfCurrentToken: currentTokenPrice(44)
          }
        ]

      },
      {
        _id: mongoose.Types.ObjectId("56a3e4661f46c422ef8bad42"),
        balance: 1000,
        tokenSupply: 21,
        name: 'todd',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Haltern_am_See%2C_Seebucht_Hohe_Niemen_--_2014_--_1152.jpg/320px-Haltern_am_See%2C_Seebucht_Hohe_Niemen_--_2014_--_1152.jpg',
        tokenHistory: [
          {
            name: moment().format("M/D"),
            tokenSupply: 2,
            priceOfNextToken: nextTokenPrice(2),
            salePriceOfCurrentToken: currentTokenPrice(2)
          },
          {
            name: moment().format("M/D"),
            tokenSupply: 17,
            priceOfNextToken: nextTokenPrice(17),
            salePriceOfCurrentToken: currentTokenPrice(17)
          },
          {
            name: moment().format("M/D"),
            tokenSupply: 56,
            priceOfNextToken: nextTokenPrice(56),
            salePriceOfCurrentToken: currentTokenPrice(56)
          },
          {
            name: moment().format("M/D"),
            tokenSupply: 21,
            priceOfNextToken: nextTokenPrice(21),
            salePriceOfCurrentToken: currentTokenPrice(21)
          }
        ]
      },
      {
        _id: mongoose.Types.ObjectId("56a3fc84898cf1bbf055cd5a"),
        balance: 1000,
        tokenSupply: 379,
        name: 'matt',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/M%C3%BCnster%2C_St.-Paulus-Dom_--_2014_--_0323.jpg/320px-M%C3%BCnster%2C_St.-Paulus-Dom_--_2014_--_0323.jpg',
        tokenHistory: [
          {
            name: moment().format("M/D"),
            tokenSupply: 200,
            priceOfNextToken: nextTokenPrice(200),
            salePriceOfCurrentToken: currentTokenPrice(200)
          },
          {
            name: moment().format("M/D"),
            tokenSupply: 248,
            priceOfNextToken: nextTokenPrice(248),
            salePriceOfCurrentToken: currentTokenPrice(248)
          },
          {
            name: moment().format("M/D"),
            tokenSupply: 179,
            priceOfNextToken: nextTokenPrice(179),
            salePriceOfCurrentToken: currentTokenPrice(179)
          },
          {
            name: moment().format("M/D"),
            tokenSupply: 379,
            priceOfNextToken: nextTokenPrice(379),
            salePriceOfCurrentToken: currentTokenPrice(379)
          }
        ]
      }
    )
    .then(() => {
      console.log('finished populating users');
    });
  });
