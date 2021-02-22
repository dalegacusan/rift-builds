const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const buildSchema = new mongoose.Schema({
	buildTitle: String,
	buildRole: String,
	champion: {
		id: String,
		championName: String,
		url: String,
	},
	dateSubmitted: Date,
	itemsConfirmed: { type: Array, default: [] },
	rank: Object,
	runes: Object,
	spells: Object,
	username: String,
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