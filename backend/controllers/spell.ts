import { Request, Response, NextFunction } from 'express';
import spells from '../data/wildriftspells.json';
const Message = require('../shared/constants/validationMessages');

const getAllSpells = (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(200).json(spells);
	} catch (err) {
		res.status(400).json({
			message: Message.ERROR.SPELL.FAILED_TO_GET_DATA_FOR_ALL_SPELLS,
		});

		next(err);
	}
};

module.exports = {
	getAllSpells,
};
