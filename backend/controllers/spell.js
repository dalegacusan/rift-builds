const spells = require('../data/wildriftspells.json');

const getAllSpells = (req, res, next) => {
	res.status(200).json(spells);
}

module.exports = {
	getAllSpells
}