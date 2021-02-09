const champions = require('../data/wildriftchampions.json');

const getAllChampions = (req, res, next) => {
	res.status(200).json(champions);
}

const getOneChampion = async (req, res, next) => {
	const { championId } = req.params;

	try {
		const oneChampion = champions.filter(champion => champion.id === championId)

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