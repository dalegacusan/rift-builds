const items = require('../data/wildriftitems.json');

const getAllItems = (req, res, next) => {
	res.status(200).json(items);
}

module.exports = {
	getAllItems
}