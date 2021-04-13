import { Request, Response, NextFunction } from 'express';
import items from '../data/wildriftitems.json';
import { Message } from '../shared/constants/validationMessages';

const getAllItems = (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.status(200).json(items);
	} catch (err) {
		return res.status(400).json({
			message: Message.ERROR.ITEM.FAILED_TO_GET_DATA_FOR_ALL_ITEMS,
		});
	}
};

module.exports = {
	getAllItems,
};
