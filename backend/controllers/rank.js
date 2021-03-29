const ranks = require('../data/wildriftranks.json');
const MESSAGES = require('../utils/constants/messages');

const getAllRanks = (req, res, next) => {
	try {
		res.status(200).json(ranks);
	} catch (err) {
		res.status(400).json({
			message: MESSAGES.ERROR.RANK.FAILED_TO_GET_DATA_FOR_ALL_RANKS
		});
	}
}

module.exports = {
	getAllRanks
}