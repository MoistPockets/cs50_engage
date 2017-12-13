/*
	route.js is responsible for alal of our applicaitons routing. In order to authenticate these routes, 
	simply place "authentication" followed by a comma in front of the function called at each HTTP verb. 
	For example, .get(userController.profile) --> authenticated --> .get(authenticate, userController.profile)
	route.js relies on the individiual controllers that are found within the controller folder. 
  */
const router = require("express").Router(), // Initialize express router so we may utilize its functionallity
jwt = require("express-jwt"),
config = require("./config"),
userController = require("../controllers/user"), // Require the userController so we have access to its exported functions
organizationController = require("../controllers/organization"), // Require the organizationController so we have access to its exported functions
eventController = require("../controllers/event"), // Require the eventController so we have access to its exported functions
passport = require("passport"),
// Setup JWT Authentication: requestProperty lets us have access to the JWT information in req.auth
authenticate = jwt({
	secret: config.secret,
	requestProperty: "auth" // Default is user but that's occupied by Mongoose user object
});

require("../models/users"); // User Model Access
require("../config/passport"); // Passport Configuration Access

// USER ROUTING
router.route("/register")
	.post(userController.register);
router.route("/users")
	.post(userController.login)
	.get(userController.findAll); // Should I populate this with the users organizations? 
router.route("/users/:user_id")
	.get(userController.findOne);
router.route("/profile")
	.get(userController.profile);
	// EDIT PROFILE?

//ORGANIZATION AND EVENT ROUTING
router.route("/organizations")
	.get(organizationController.findAll) // All Organizations
	.post( organizationController.register); // Create 
router.route("/organizations/:org_id")
	.post(organizationController.join) // Join Organization
	.get(organizationController.findOne); // Find an Organization
// Event
router.route("/events/:org_id?")
	.get(eventController.findAll) // Find all events 
	.post(eventController.register); // Create event

router.route("/event/:event_id")
	.post(eventController.join); // Join Event



module.exports = router;