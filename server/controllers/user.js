var UserModel = require('../models/user')
var MessageModel = require('../models/message')

var stream_node = require('getstream-node');
var FeedManager = stream_node.FeedManager;
var StreamMongoose = stream_node.mongoose;
var StreamBackend = new StreamMongoose.Backend();

exports.listUsers = (request, response) => {

  return UserModel.find({}).lean()
    .then((userData)=>{
      return response.json(userData)
    }).catch((error)=>{
      return response.json(error)
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

exports.getMessagesByUser = (request, response) => {

  const userId = request.params.userId || '0'

  // GetStream feed
  var userFeed = FeedManager.getUserFeed(userId);
  userFeed.get({})
   .then(function (body) {
     var activities = body.results;

     return StreamBackend.enrichActivities(activities)
   })
   .then(function (enrichedActivities) {

     return response.json({
       location: 'feed',
       user: userId,
       activities: enrichedActivities
     });

   })
   .catch((error)=>{
     return response.json(error)
   })

}

exports.saveMessage = (request, response) => {

  const userId = request.body.user.id || '0'
  const message = request.body.value || 'default'

  return MessageModel.create({
      user: userId,
      text: message,
      created_at: new Date()
  })
  .then((mongoSaveResponse)=>{
    var userFeed = FeedManager.getUserFeed(userId);
    return userFeed.get({})
  .then(function (body) {
    var activities = body.results;
    return StreamBackend.enrichActivities(activities)})
  .then(function (enrichedActivities) {
    return response.json({
       location: 'feed',
       user: userId,
       activities: enrichedActivities
      })
    })
  }).catch((error)=>{
    return response.json(error)
  })

}
