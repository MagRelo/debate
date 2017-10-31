'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var stream = require('getstream-node');
var FeedManager = stream.FeedManager;
var StreamMongoose = stream.mongoose;
var StreamBackend = new StreamMongoose.Backend();

var FollowSchema = new Schema({
		user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
		target: { type: Schema.Types.ObjectId, required: true, ref: 'Contract' }
	});

// GetStream integration
FollowSchema.plugin(StreamMongoose.activity);


FollowSchema.methods.activityNotify = function() {
	var target_feed = FeedManager.getNotificationFeed(this.target._id);
	return [target_feed];
};

FollowSchema.methods.activityForeignId = function() {
	return this.user._id + ':' + this.target._id;
};

FollowSchema.statics.pathsToPopulate = function() {
	return ['user', 'target'];
};

FollowSchema.post('save', function(doc) {
	if (doc.wasNew) {
		var userId = doc.user._id || doc.user;
		var targetId = doc.target._id || doc.target;
		FeedManager.followUser(userId, targetId);
	}
});

FollowSchema.post('remove', function(doc) {
	FeedManager.unfollowUser(doc.user, doc.target);
});


// Export model
module.exports = mongoose.model('Follow', FollowSchema);
