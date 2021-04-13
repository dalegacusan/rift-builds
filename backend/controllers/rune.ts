import { Request, Response, NextFunction } from 'express';
import runes from '../data/wildriftrunes.json';
import { Message } from '../shared/constants/validationMessages';

const getAllRunes = (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.status(200).json(runes);
	} catch (err) {
		return res.status(400).json({
			message: Message.ERROR.RUNE.FAILED_TO_GET_DATA_FOR_ALL_RUNES,
		});
	}
};

module.exports = {
	getAllRunes,
};
