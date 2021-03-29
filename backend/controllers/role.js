const roles = require('../data/wildriftroles.json');
const MESSAGES = require('../utils/constants/messages');

const getAllRoles = (req, res, next) => {
	try {
		res.status(200).json(roles);
	} catch (err) {
		res.status(400).json({
			message: MESSAGES.ERROR.ROLE.FAILED_TO_GET_DATA_FOR_ALL_ROLES
		});
	}
}

module.exports = {
	getAllRoles
}