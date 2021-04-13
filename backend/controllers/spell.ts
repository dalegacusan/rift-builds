import { Request, Response, NextFunction } from 'express';
import spells from '../data/wildriftspells.json';
import { Message } from '../shared/constants/validationMessages';

const getAllSpells = (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.status(200).json(spells);
	} catch (err) {
		return res.status(400).json({
			message: Message.ERROR.SPELL.FAILED_TO_GET_DATA_FOR_ALL_SPELLS,
		});
	}
};

module.exports = {
	getAllSpells,
};
