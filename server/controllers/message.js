var UserModel = require('../models/user')
var MessageModel = require('../models/message')

const encrypt = require('../config/encrypt')

var stream_node = require('getstream-node');
var FeedManager = stream_node.FeedManager;
var StreamMongoose = stream_node.mongoose;
var StreamBackend = new StreamMongoose.Backend();

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

      const decrypted = enrichedActivities.map(activity => {
        if(activity.object){
          activity.object.text = encrypt.decrypt(activity.object.text)
        }
        return activity
      })

      return response.json({
        location: 'feed',
        user: userId,
        activities: decrypted
      });

    })
    .catch((error)=>{
      console.log(error.message)
      return response.json(error)
    })

}

exports.getTimelineByUser = (request, response) => {

  const userId = request.params.userId || '0'

  // GetStream feed
  var flatFeed = FeedManager.getNewsFeeds(userId)['timeline_flat'];
  flatFeed.get({})
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
exports.getAggregatedTimelineByUser = (request, response) => {

  const userId = request.params.userId || '0'

  // GetStream feed
  var flatFeed = FeedManager.getNewsFeeds(userId)['timeline_aggregated'];
  flatFeed.get({})
   .then(function (body) {
     var activities = body.results;
     return StreamBackend.enrichAggregatedActivities(activities)
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
      text: encrypt.encrypt(message),
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
