import mongoose from 'mongoose';

import { BuildInterface } from '../shared/interfaces/interfaces';
import { RequiredLength } from '../shared/constants/requiredLengths';
const { GameMode, GameRegion } = require('../shared/constants/constants');

const mongoosePaginate = require('mongoose-paginate-v2');

const buildSchema = new mongoose.Schema({
	buildTitle: {
		type: String,
		required: true,
		minlength: RequiredLength.BUILD_TITLE.MIN_LENGTH,
		maxLength: RequiredLength.BUILD_TITLE.MAX_LENGTH,
		trim: true,
	},
	buildRole: Object,
	champion: Object,
	dateSubmitted: { type: Date, default: Date.now },
	description: {
		type: String,
		minlength: RequiredLength.REASON.MIN_LENGTH,
		maxLength: RequiredLength.REASON.MAX_LENGTH,
		trim: true,
	},
	gameMode: {
		type: String,
		lowercase: true,
		enum: [GameMode.NORMAL, GameMode.ARAM],
	},
	itemsConfirmed: { type: Array, default: [] },
	patchVersion: { type: String },
	rank: Object,
	runes: Object,
	region: {
		type: String,
		lowercase: true,
		enum: [GameRegion.SEA, GameRegion.NA, GameRegion.EUW],
	},
	spells: Object,
	username: { type: String, required: true, trim: true },
});

buildSchema.plugin(mongoosePaginate);

buildSchema.set('toJSON', {
	// Type is ANY based on @types/mongoose index.d.ts Line 1692
	transform: (document: any, returnedObject: any) => {
		// _id is an object
		// Convert to string just to be safe and for future tests
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model<BuildInterface>('Build', buildSchema);
