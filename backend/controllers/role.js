const roles = require('../data/wildriftroles.json');

const getAllRoles = (req, res, next) => {
	res.status(200).json(roles);
}

module.exports = {
	getAllRoles
}