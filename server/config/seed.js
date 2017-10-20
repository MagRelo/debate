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
        balance: 1000,
        name: 'ben',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Location_of_%22We_Thank_Thee_O_God%22_inscription_-_panoramio.jpg/320px-Location_of_%22We_Thank_Thee_O_God%22_inscription_-_panoramio.jpg'
      },
      {
        _id: mongoose.Types.ObjectId("56a3e4661f46c422ef8bad42"),
        balance: 1000,
        name: 'todd',
        avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/ABS-8752.0-BuildingActivityAustralia-ValueBuildingWorkBySectorAustralianCapitalTerritory-Original-ValueWorkCommenced-AustralianCapitalTerritory-TotalSectors-TotalResidential-AlterationsAdditionsIncludingConversions-A83798021J.svg/320px-thumbnail.svg.png'
      },
      {
        _id: mongoose.Types.ObjectId("56a3fc84898cf1bbf055cd5a"),
        balance: 1000,
        name: 'matt',
        avatarUrl: 'https://c1.staticflickr.com/2/1252/1484545713_a6477d339e_b.jpg'
      }
    )
    .then(() => {
      console.log('finished populating users');
    });
  });
