const champions = require('../wildriftchampions.json');

const getAllChampions = (req, res, next) => {
	res.status(200).json(champions);
}

module.exports = {
	getAllChampions
}