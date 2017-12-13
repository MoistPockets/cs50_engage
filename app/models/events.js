const mongoose = require("mongoose");

let EventSchema = new mongoose.Schema({
	name: String, 
	created: {
		type: Date,
		default: Date.now()
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	date: Date, 
	description: String, 
	location: {
		type: String, 
		required: false
	},
	members : [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]
});


module.exports = mongoose.model('EventSchema', EventSchema);	