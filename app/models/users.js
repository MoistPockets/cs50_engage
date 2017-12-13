const mongoose = require("mongoose"),
Organization = require("./organizations"),
bcrypt = require("bcrypt"),  // Allows hash and random salt creation
jwt = require("jsonwebtoken"),
config = require("../config/config"); 

let UserSchema = new mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		trim: true,
		unique: true
	},
	password: String,
	name: {
		first: String,
		last: String
	},
	birthdate: Date,
	education: {
		university: String,
		major: String,
		year: String
	},
	biography: {
		type: String,
		required: false
	},
	interests: {
		type: [String]
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

UserSchema.methods.createHash = function(password) {
	const saltRounds = 10; // EXPLAIN
	let salt = bcrypt.genSaltSync(saltRounds), //EXPLAIN
		hash = bcrypt.hashSync(password, salt);
	return hash;
};

UserSchema.methods.compareHash = function(password) {
	return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.createJWT= function() {
	return jwt.sign({
		id: this._id,
		email: this.email,
		name: this.name.first
	}, config.secret, {
		expiresIn: '2h'
	});

};


module.exports = mongoose.model('User', UserSchema);

// TODO: Authentication