const Organization = require("../models/organizations"),
User = require("../models/users"),
mongoose = require("mongoose");
// Google DATABASE SAFETY 
// FIND ORGANIZATIONS
exports.findAll = function(req, res) {
	Organization.find(function(err, organizations) {
		if (err) {
			res.status(401).json({
				success: false,
				message: err.errmsg
			});
		}

		if (!organizations) {
			return res.status(401).json({
				success: false,
				message: "Sorry, no organizations currently exist."
			});
		}
		res.json(organizations);

	});
};
// Find Individual Organization
exports.findOne = function(req, res) {
	Organization.findById(req.params.org_id, function(err, organization) {
		if (err) {
			return res.status(401).json({
				success: false,
				message: err.errmsg
			});
		}
		if (!organization) {
			return res.status(401).json({
				success: false,
				message: "Organization not found."
			});
		}
		res.status(200).json(organization);
	});
};

// Create an Organization
exports.register = function(req, res) {
	// TODO
	if (req.body.name &&
		req.body.description &&
		req.body.keywords) { // What about pulling out keywords fromm the description or just searching agaisnt the description? 

		let org = new Organization({
			name: req.body.name,
			description: req.body.description,
			keywords: req.body.keywords.split(','),
			// admin: req.auth.id, // Uncomment these if authentication is used to allow an admin
			// members: req.auth.id // Uncomment these to allow member functionallity 
		});

		org.save(function(err) {
			let msg = {
				sucess: true,
				message: "Organization created!"
			}
			if (err) {
				msg = (err.code == 11000) ? {
					sucess: false,
					message: "Organization name already exists."
				} : {
					sucess: false,
					message: err.errmsg
				};

				return res.status(409).json(msg);
			}

			res.status(201).json(msg);
		});
	} else {
		res.status(400).json({
			success: false,
			message: "Please complete the form!"
		});
	}
};
// Join and Organization
exports.join = function(req, res) {
	Organization.findByIdAndUpdate(req.params.org_id, {
		$addToSet: { // Add to set prevents duplicate members
			members: req.auth.id
		}
	}, {
		new: true
	}, function(err, org) {
		if (err) {
			return res.json({
				success: false,
				message: err.errmsg
			})
		}

		res.json({
			succes: true,
			message: req.auth.name + " successfully joined " + org.name + "!"
		});

	});
};