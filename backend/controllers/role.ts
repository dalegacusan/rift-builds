import { Request, Response, NextFunction } from 'express';
import roles from '../data/wildriftroles.json';
import { Message } from '../shared/constants/validationMessages';

const getAllRoles = (req: Request, res: Response, next: NextFunction) => {
	try {
		return res.status(200).json(roles);
	} catch (err) {
		return res.status(400).json({
			message: Message.ERROR.ROLE.FAILED_TO_GET_DATA_FOR_ALL_ROLES,
		});
	}
};

module.exports = {
	getAllRoles,
};
