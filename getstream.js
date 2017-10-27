exports.config = {
	apiKey: process.env.STREAM_KEY || 'rnaqdxgcqj4y',
	apiSecret: process.env.STREAM_SECRET || 'rnntynnh4fuuzkx6urq9wucss7afp7hfefqn72t4z39h5tx4tymqxrdv6kwq3a4q',
	apiAppId: process.env.STREAM_APP_ID || '30316',
	apiLocation: 'us-east',
	userFeed: 'user',
	notificationFeed: 'notification',
	newsFeeds: {
		'flat': 'timeline_flat',
		'aggregated': 'timeline_aggregated'
	}
};
