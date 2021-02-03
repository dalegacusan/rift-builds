const ranks = require('../data/wildriftranks.json');

const getAllRanks = (req, res, next) => {
	res.status(200).json(ranks);
}

module.exports = {
	getAllRanks
}