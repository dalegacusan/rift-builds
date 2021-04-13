import { Request, Response, NextFunction } from 'express';
import ranks from '../data/wildriftranks.json';
import { Message } from '../shared/constants/validationMessages';

const getAllRanks = (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.status(200).json(ranks);
	} catch (err) {
		return res.status(400).json({
			message: Message.ERROR.RANK.FAILED_TO_GET_DATA_FOR_ALL_RANKS,
		});
	}
};

module.exports = {
	getAllRanks,
};
