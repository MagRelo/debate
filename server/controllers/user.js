var UserModel = require('../models/user')
var MessageModel = require('../models/message')
var FollowModel = require('../models/follow')

var stream_node = require('getstream-node');
var FeedManager = stream_node.FeedManager;
var StreamMongoose = stream_node.mongoose;
var StreamBackend = new StreamMongoose.Backend();



function markFollowers (users, followers) {

  var followerIds = followers.map(function(item) {
		return item.target.toHexString();
	});

  users.forEach((user) => {
    if (followerIds.indexOf(user._id.toHexString()) !== -1){
      user.followed = true;
    }
  })

  return users
};

function getMarkedUserList (userId){
  let userList = []

  return UserModel.find({}).lean()
    .then((userListArray)=>{
      userList = userListArray
      return FollowModel.find({user: userId}).lean()
    }).then((FollowArray)=>{
      return markFollowers(userList, FollowArray)
    })
}


exports.listUsers = (request, response) => {

  return getMarkedUserList(request.body.userId)
    .then((enrichedUserList)=>{
      return response.json(enrichedUserList)
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
      return response.json(mongoResponse)
    }).catch((error)=>{
      return response.json(error)
    })

}

exports.getUser = (request, response) => {

  const userName = request.params.name || 'default name'

  return UserModel.findOne({name: userName}).lean()
    .then((userData)=>{
      return response.json(userData)
    }).catch((error)=>{
      return response.json(error)
    })

}

exports.followUser = (request, response) => {

  UserModel.findOne({ _id: request.body.target })
    .then(target => {

      if (target){
        const follow = new FollowModel({
          user: request.body.user,
          target: request.body.target
        });

        let userList = []

        return follow.save()
          .then(follow => {
            return getMarkedUserList(request.body.user)
          }).then((enrichedUserList)=>{
            return response.json(enrichedUserList)
          })
        }

        // target user not found
        return response.status(404).send('Not found');
    })
    .catch(error => {
      console.error(error.message)
      return response.status(500).json({error: error.message});
    })

}

exports.unFollowUser = (request, response) => {

  FollowModel.findOne({
    user: request.body.user,
    target: request.body.target
  }).then(follow => {

      if(follow){
        console.log('found, removing...')
        return follow.remove()
        .then(follow => {
          return getMarkedUserList(request.body.user)
        }).then((enrichedUserList)=>{
          return response.json(enrichedUserList)
        })
      }

      console.log('follow not found')
      return response.status(404).send('Not found');
    })
    .catch(error => {
      console.error(error.message)
      return response.status(500).json({error: error.message});
    })

}
