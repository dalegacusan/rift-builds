const ranks = require('../wildriftranks.json');

const getAllRanks = (req, res, next) => {
	res.status(200).json(ranks);
}

module.exports = {
	getAllRanks
}