const items = require('../data/wildriftitems.json');
const MESSAGES = require('../utils/constants/messages');

const getAllItems = (req, res, next) => {
	try {
		res.status(200).json(items);
	} catch (err) {
		res.status(400).json({
			message: MESSAGES.ERROR.ITEM.FAILED_TO_GET_DATA_FOR_ALL_ITEMS
		});
	}
}

module.exports = {
	getAllItems
}