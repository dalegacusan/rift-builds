const champions = require('../data/wildriftchampions.json');
const championNameCounterparts = require('../utils/constants/championNameCounterparts');
const MESSAGES = require('../utils/constants/messages');

const getAllChampions = (req, res, next) => {
	try {
		res.status(200).json(champions);
	} catch (err) {
		res.status(400).json({
			message: MESSAGES.ERROR.CHAMPION.FAILED_TO_GET_DATA_FOR_ALL_CHAMPIONS
		});
	}
}

const getOneChampion = async (req, res, next) => {
	const { championName } = req.params;

	try {
		const oneChampion = champions.filter(champion =>
			championNameCounterparts[championName] === champion.championName
		);

		res.status(200).json(oneChampion);
	} catch (err) {
		res.status(400).json({
			message: MESSAGES.ERROR.CHAMPION.FAILED_TO_GET_DATA_FOR_CHAMPION,
		});

		next(err);
	}
}

module.exports = {
	getAllChampions,
	getOneChampion
}