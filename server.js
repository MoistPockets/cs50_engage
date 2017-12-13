// MOVE ROUTES TO CONFIG
// var to let? 
// Module Initialization
const express = require("express"),
session = require("express-session"),
app = express(),
bodyParser = require("body-parser"),
passport = require("passport"),
api = require("./app/config/routes"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
morgan = require("morgan"),
path = require("path"),
config = require("./app/config/config");

// Configuration 
mongoose.Promise = global.Promise; // Sets mongoose promise library
mongoose.connect(config.mongoose_uri); // Connect to mongoose library
app.use(morgan('dev')); // Log requests to the console
app.use(methodOverride('X-HTTP-Method-Override')); // Simulates HTTP verbs PUT/DELETE
// Permit the app to get information from html form
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Initialize Passport as Express Middleware
app.use(passport.initialize());
// Serve files from public directory

// Load router module and prefix api requests with "/api"
app.use('/api', api);

// Error Handling
// Handles the error from authentication middleware in routes.js
app.use(function(err, req, res, next){
	if(err.name === "UnauthorizedError")
		res.status(401).json({success: false, message: err.message});
});

// Serves Static files from public directory
app.use(express.static(__dirname + '/public'));
// Sends index page for all other requests that aren't routed
app.get('*', function(req, res) {
	res.sendFile(__dirname + '/public/app/views/index.html');
});
app.listen(config.port, function() {
    console.log('Sever is currently running on port ' + config.port + '!');
});

