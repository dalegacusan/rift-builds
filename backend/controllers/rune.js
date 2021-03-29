const runes = require('../data/wildriftrunes.json');
const MESSAGES = require('../utils/constants/messages');

const getAllRunes = (req, res, next) => {
	try {
		res.status(200).json(runes);
	} catch (err) {
		res.status(400).json({
			message: MESSAGES.ERROR.RUNE.FAILED_TO_GET_DATA_FOR_ALL_RUNES
		});
	}
}

module.exports = {
	getAllRunes
}