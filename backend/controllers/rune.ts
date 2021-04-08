import { Request, Response, NextFunction } from 'express';
import runes from '../data/wildriftrunes.json';
const Message = require('../shared/constants/validationMessages');

const getAllRunes = (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(200).json(runes);
	} catch (err) {
		res.status(400).json({
			message: Message.ERROR.RUNE.FAILED_TO_GET_DATA_FOR_ALL_RUNES,
		});

		next(err);
	}
};

module.exports = {
	getAllRunes,
};
