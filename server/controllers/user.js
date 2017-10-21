var stream_node = require('getstream-node');
var FeedManager = stream_node.FeedManager;
var StreamMongoose = stream_node.mongoose;
var StreamBackend = new StreamMongoose.Backend();

var bluebird = require('bluebird')

// Models
var UserModel = require('../models/user')
var FollowModel = require('../models/follow')


function markFollowers (users, followers, userId) {

  var followerIds = followers.map(function(item) {
		return item.target.toHexString();
	});

  let markedUsers = users
    .filter(user => {
      return userId !== user._id.toHexString()
    })
    .map((user) => {
      if (followerIds.indexOf(user._id.toHexString()) !== -1){
        user.followed = true;
      }
      return user
    })

  return markedUsers
};

function getMarkedUserList (userId){
  let userList = []

  return UserModel.find({}).lean()
    .then((userListArray)=>{
      userList = userListArray
      return FollowModel.find({user: userId}).lean()
    }).then((FollowArray)=>{
      return markFollowers(userList, FollowArray, userId)
    })
}

function getUserWithBalances(userId){

  return bluebird.all([
    UserModel.findOne({_id: userId}).lean(),
    FollowModel.find({user: userId}).lean(),
    FollowModel.find({target: userId}).lean()
  ])
  .then((responseArray)=>{

    let userObject = responseArray[0]
    let followingArray = responseArray[1]
    let followedArray = responseArray[2]

    // Users that you are following
    userObject.followingCount = followingArray.length
    userObject.amountStaked = followingArray.reduce((sum, follow) => {
      return sum + follow.valueStaked
    }, 0)

    // Users that are following you
    userObject.followerCount = followedArray.length
    userObject.amountStakedonYou = followedArray.reduce((sum, follow) => {
      return sum + follow.valueStaked
    }, 0)

    userObject.totalBalance = userObject.balance + userObject.amountStaked + userObject.amountStakedonYou

    return userObject
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

  const userId = request.params.userId || 'default name'

  getUserWithBalances(userId)
    .then(user => {
      return response.json(user)
    })
    .catch((error)=>{
      return response.json(error)
    })

}

exports.followUser = (request, response) => {

  UserModel.findOne({ _id: request.body.target })
    .then(target => {

      if (target){
        const follow = new FollowModel({
          user: request.body.user,
          target: request.body.target,
          valueStaked: 10
        });

        return follow.save()
          .then(follow => {
            return UserModel.findOne({ _id: request.body.user })
          }).then((user)=>{
            // decrement balance
            user.balance = user.balance - 10
            return user.save()
          }).then((user)=>{
            return getUserWithBalances(request.body.user)
          }).then((user)=>{
            return response.json(user)
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
          return UserModel.findOne({ _id: request.body.user })
        }).then((user)=>{
          // increment balance
          user.balance = user.balance + 10
          return user.save()
        }).then((user)=>{
          return getUserWithBalances(request.body.user)
        }).then((user)=>{
          return response.json(user)
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
