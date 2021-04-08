import { Request, Response, NextFunction } from 'express';
import roles from '../data/wildriftroles.json';
const Message = require('../shared/constants/validationMessages');

const getAllRoles = (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(200).json(roles);
	} catch (err) {
		res.status(400).json({
			message: Message.ERROR.ROLE.FAILED_TO_GET_DATA_FOR_ALL_ROLES,
		});

		next(err);
	}
};

module.exports = {
	getAllRoles,
};
