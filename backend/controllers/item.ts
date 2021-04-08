import { Request, Response, NextFunction } from 'express';
import items from '../data/wildriftitems.json';
const Message = require('../shared/constants/validationMessages');

const getAllItems = (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(200).json(items);
	} catch (err) {
		res.status(400).json({
			message: Message.ERROR.ITEM.FAILED_TO_GET_DATA_FOR_ALL_ITEMS,
		});

		next(err);
	}
};

module.exports = {
	getAllItems,
};
