var stream_node = require('getstream-node');
var FeedManager = stream_node.FeedManager;
var StreamMongoose = stream_node.mongoose;
var StreamBackend = new StreamMongoose.Backend();

var bluebird = require('bluebird')

// Models
const UserModel = require('../models/user')
const populateTargets = 'walletArray.contract contracts'
const populateFields= 'contractOptions tokenHistory'
const FollowModel = require('../models/follow')

const pricingFunctions = require('../config/pricing')
const utils = require('../config/utils')

function getMarkedUserList (userId){
  let userList = []
  return UserModel.find({}).lean()
    .then((userListArray)=>{
      userList = userListArray
      return FollowModel.find({user: userId}).lean()
    })
    .then((FollowArray)=>{

      const followerIds = FollowArray.map(function(item) {
    		return item.target.toHexString();
    	});

      const markedUsers = userList.map((user) => {
          // mark the users that the current user is following
          user.followed = (followerIds.indexOf(user._id.toHexString()) !== -1)
          return user
        })

      return markedUsers
    })
}

exports.listUsers = (request, response) => {

  // return getMarkedUserList(request.body.userId)
  
  return UserModel.find({}).lean()
    .then((userList)=>{
      return response.json(userList)
    }).catch((error)=>{
      console.error(error.message)
      return response.status(500).json({error: error.message});
    })

}

exports.saveUser = (request, response) => {

  const userName = request.body.name || 'default name'
  const avatarUrl = request.body.avatarUrl || 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'

  const user = new UserModel({
    name: userName,
    avatarUrl: avatarUrl,
    timestamp: new Date()
  })

  return user.save()
    .then((mongoResponse)=>{
      // follow yourself so you're activity shows up in timeline feed
      const newFollow = new FollowModel({ user: userId, target: userId })
      return newFollow.save()
    }).then((mongoResponse)=>{
      return response.json(mongoResponse)
    }).catch((error)=>{
      return response.json(error)
    })

}

exports.getCurrentUser = function(req, res, next) {
  UserModel.findById(req.auth.id, function(err, user) {
    if (err) {
      next(err);
    } else {
      req.user = user;
      next();
    }
  });
};
