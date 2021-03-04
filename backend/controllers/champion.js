const champions = require('../data/wildriftchampions.json');
const championNameCounterparts = require('../utils/championNameCounterparts');

const getAllChampions = (req, res, next) => {
	res.status(200).json(champions);
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
			message: 'Failed to retrieve champion data.',
		});

		next(err);
	}
}

module.exports = {
	getAllChampions,
	getOneChampion
}