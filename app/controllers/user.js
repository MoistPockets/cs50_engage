// Handle Validation on Front End
// Database SHOULD return error with non-specified values
const User = require('../models/users'),
	Organization = require('../models/organizations'),
	passport = require("passport"),
	mongoose = require('mongoose');


// REGISTER USER
exports.register = function(req, res) {
	// Make sure all required fields exist in request
	if (req.body.email &&
		req.body.password &&
		req.body.firstname &&
		req.body.lastname &&
		req.body.birthdate &&
		req.body.university &&
		req.body.major &&
		req.body.year &&
		req.body.biography &&
		req.body.interests) {

		let user = new User({
			email: req.body.email,
			name: {
				first: req.body.firstname,
				last: req.body.lastname
			}, // TODO: Make sure front end returns name as an object containing first and last name 
			birthdate: req.body.birthdate, // Provide calendar input ONLY -- uniform formatting
			education: {
				university: req.body.university,
				major: req.body.major,
				year: req.body.year
			}, // TODO: Make sure front end returns education as an object containing university, major, and year
			biography: req.body.biography,
			interests: req.body.interests.split(',') // TODO: Only allow individual word selection --> front end should turn that into an array using split? 
		});
		// Create hash
		user.password = user.createHash(req.body.password);

		// Save User
		user.save(function(err) {
			// Check Duplicate Key Error
			if (err) {
				let msg = (err.code == 11000) ? {
					sucess: false,
					message: "Email already exists."
				} : {
					sucess: false,
					message: err.errmsg
				};
				return res.status(409).json(msg);
			}

			res.status(200).json({
				sucess: true,
				message: "User created!",
				token: user.createJWT()
			});
		});
	} else {
		res.status(400).json({
			success: false,
			message: "Please complete the form!"
		});
	}

};

// LOGIN USER - Custom Callback (No Session)
exports.login = function(req, res) {
	if (req.body.email && req.body.password) {
		passport.authenticate("local", function(err, user, info) {
			if (err)
				return res.status(404).json(info);
			// No user found
			if (!user)
				res.status(401).json(info);
			// User Found
			if (user) {
				res.status(200).json({
					success: true,
					token: user.createJWT()
				});
			}
		})(req, res); // is next necessary according to documentation? 
	} else {
		res.status(400).json({
			success: false,
			message: "Please complete the form!"
		});
	}
};

// RETURN ALL USERS IN DATABASE
exports.findAll = function(req, res) {
	// Don't return hashs/private informtion
	User.find({}, {
		password: 0
	}, function(err, users) {
		if (err) {
			return res.status(401).json({
				success: false,
				message: err.errmsg
			});
		}
		res.status(200).json(users);
	});
};


// RETURN SPECIFIC USER BY ID
// TODO: Allow searching by other fields 
exports.findOne = function(req, res) {
	User.findById(req.params.user_id, {
		password: 0
	}, function(err, user) {
		if (err) {
			return res.status(401).json({
				success: false,
				message: err.errmsg
			});
		}
		if (!user) {
			res.status(401).json({
				success: false,
				message: "User not found"
			});
		}

		res.status(200).json(user);
	});
};

// Get a user's "profile" --> Returns all organizations that the user is a member of
exports.profile = function(req, res) {

	Organization.find({
			members: req.auth.id
		}).exec()
		.then(function(organizations) {
			User.findById(req.auth.id).lean().exec(function(err, user) {
				if (err) {
					return res.status(401).json({
						success: false,
						message: err.errmsg
					});
				}

				user.organizations = organizations || null;
				res.status(200).json(user);
			});
		});
};
