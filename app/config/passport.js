// Passport Configuration: Allows us to effictevely use the Passport module
const mongoose = require("mongoose"),
	User = require("../models/users"), // Require the User Model to run User methods
	passport = require("passport"),
	LocalStrategy = require('passport-local').Strategy; // Require passport's local strategy since we're doign local-login

passport.use(new LocalStrategy({
		usernameField: "email" // The email field default is username, but my program utilizes email, instead.
	},
	function(email, password, done) {
		// Find a user
		User.findOne({
			email: email
		}, function(err, user) {
			if (err)
				return done(err);
			// User not found
			if (!user) {
				return done(null, false, {
					success: false,
					message: "User with specified email not found."
				});
			}
			// Invalid Password: hash doesn't match 
			if(!user.compareHash(password)){
				return done(null, false, {
					success: false,
					message: "Invalid password."
				});				
			}

			return done(null, user); // Return the user if authenticated successfully.
		});
	}));



