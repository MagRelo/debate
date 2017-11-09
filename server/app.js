const express = require('express')
const app = express()


// Express middleware
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var helmet = require('helmet');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var cors = require('cors');


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

// enable cors
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

// routing config
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


// BUILT REACT APP
app.use(express.static('build_webpack'))

// API ROUTING
require('./api')(app);

app.listen(8080, function () {
  console.log('App running on port 8080')
})
