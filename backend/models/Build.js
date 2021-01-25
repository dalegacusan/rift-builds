const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const buildSchema = new mongoose.Schema({
	dateSubmitted: Date,
	username: String,
	rank: Object,
	champion: {
		id: String,
		championName: String,
		url: String,
	},
	items: { type: Array, default: [] },
});

// buildSchema.plugin(uniqueValidator);

buildSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Build', buildSchema);