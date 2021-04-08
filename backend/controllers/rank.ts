import { Request, Response, NextFunction } from 'express';
import ranks from '../data/wildriftranks.json';
const Message = require('../shared/constants/validationMessages');

const getAllRanks = (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(200).json(ranks);
	} catch (err) {
		res.status(400).json({
			message: Message.ERROR.RANK.FAILED_TO_GET_DATA_FOR_ALL_RANKS,
		});

		next(err);
	}
};

module.exports = {
	getAllRanks,
};
