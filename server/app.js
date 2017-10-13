const express = require('express')
const app = express()

// Express middleware
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var helmet = require('helmet');
var cookieParser = require('cookie-parser');


// Connect to database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoConfig = {
  uri: 'mongodb://127.0.0.1:27017/notLinkedin',
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


// config
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '1mb'}));
app.use(methodOverride());
app.use(helmet());
app.use(cookieParser());

app.use(express.static('build_webpack'))

require('./api')(app);

app.listen(8080, function () {
  console.log('App running on port 8080')
})
