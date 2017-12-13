const Event = require("../models/events"),
	jwt = require("jsonwebtoken"),
	User = require("../models/users"),
	Organization = require("../models/organizations");

// Find All Events
exports.findAll = function(req, res) {
	if (req.params.org_id) {
		Organization.find({
			_id: req.params.org_id
		}, {
			events: 1,
			_id: 0
		}, function(err, events) {
			if (err) {
				res.status(401).json({
					success: false,
					message: err.errmsg
				});
			}

			if (!events) {
				return res.status(401).json({
					success: false,
					message: "Sorry, no events exists"
				});
			}

			res.json(events);
		});
	} else {
		Event.find(function(err, events) {
			if (err) {
				res.status(401).json({
					success: false,
					message: err.errmsg
				});
			}

			if (!events) {
				return res.status(401).json({
					success: false,
					message: "Sorry, no events exists"
				});
			}

			res.json(events);

		});
	}

};
// CREATE EVENT
exports.register = function(req, res) {
	if (req.body.name &&
		req.body.description &&
		req.body.date) {

		let event = new Event({
			name: req.body.name,
			description: req.body.description,
			date: req.body.date,
			creator: req.auth.id,
		});

		event.save(function(err) {
			let msg = {
				sucess: true,
				message: "Event created!"
			}
			if (err) {
				msg = (err.code == 11000) ? {
					sucess: false,
					message: "Event already exists."
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


exports.findOne = function(req, res){
	Event.findById(req.params.event_id, function(err, event) {
		if (err) {
			return res.status(401).json({
				success: false,
				message: err.errmsg
			});
		}
		if (!event) {
			return res.status(401).json({
				success: false,
				message: "Event not found."
			});
		}
		res.status(200).json(event);
	});
};


exports.join = function(req, res) {
	User.findOne({
		email: req.body.email
	}, '_id').exec().then(function(user) {
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "User with corrsponding email not found"
			});
		}
		Event.findByIdAndUpdate(req.params.event_id, {
			members: user
		}, function(err, data) {
			if (err) {
				return res.status(401).json({
					success: false,
					message: err.errmsg
				});
			}

			res.status(200).json(data);

		});
	})

};