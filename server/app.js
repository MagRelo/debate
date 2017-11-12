const express = require('express')
const app = express()
const assert = require('assert')


const twitterConsumerKey = 'a9nNKuouyFRamZSZyUtvRbkGl'
const twitterSecret = 'Ep9QTjcv5R4ry5py34Q4FjPlytahPMPABnGmGA293V4omVNVYE'
const TwitterTokenStrategy = require('passport-twitter-token')

// Express middleware
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const UserModel = require('./models/user')

var config = require('./config/environment');

// Connect to database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoConfig = {
  uri: process.env.MONGODB_URL_INT || 'mongodb://127.0.0.1:27017/notLinkedin',
  options: {
    useMongoClient: true
  }
}
mongoose.connect(mongoConfig.uri, mongoConfig.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);

// register GetStream with mongoose
var stream = require('getstream-node');
var StreamMongoose = stream.mongoose;
StreamMongoose.setupMongoose(mongoose);

// seed database
if(process.env.SEED_DB_CLEAN === 'true'){
  require('./config/db_seed/seed_clean')
}


// Static built react app
app.use(express.static('build_webpack'))

app.use(cors({
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
}));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '1mb'}));
app.use(methodOverride());
app.use(helmet());
app.use(cookieParser());
app.use(morgan('dev', {
  skip: function (req, res) {
    // remove the frontend dev server's 'json' calls from the console output
    return req.originalUrl.indexOf('json') > 0
  }
}));


// Express session management
var store = new MongoDBStore(
  {
    uri: process.env.MONGODB_URL_INT || 'mongodb://127.0.0.1:27017/session_store',
    collection: 'mySessions'
  }
);
store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});

const sessionOptions = {
  secret: 'keyboard cat',
  cookie: {},
  store: store,
  resave: true,
  saveUninitialized: true
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sessionOptions));

// Passport session management
app.use(passport.initialize());
app.use(passport.session());
passport.use(new TwitterTokenStrategy({
    consumerKey: twitterConsumerKey,
    consumerSecret: twitterSecret,
    includeEmail: true,
    includeStatus: true,
    includeEntities: true
  },
  function (token, tokenSecret, profile, done) {
    User.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
      return done(err, user);
    });
  }));
passport.serializeUser(function(user, done) {
  console.log('serializing user: ');
  console.log(user);
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  user.findById(id, function(err, user) {
    console.log('no im not serial');
    done(err, user);
  });
});

// API ROUTING
require('./api')(app);

app.listen(8080, function () {
  console.log('App running on port 8080')
})
