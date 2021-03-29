const spells = require('../data/wildriftspells.json');
const MESSAGES = require('../utils/constants/messages');

const getAllSpells = (req, res, next) => {
	try {
		res.status(200).json(spells);
	} catch (err) {
		res.status(400).json({
			message: MESSAGES.ERROR.SPELL.FAILED_TO_GET_DATA_FOR_ALL_SPELLS
		});
	}
}

module.exports = {
	getAllSpells
}