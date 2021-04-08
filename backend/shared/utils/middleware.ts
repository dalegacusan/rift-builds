import { Request, Response, NextFunction } from 'express';
const logger = require('./logger');

export const requestLogger = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.info('\nMethod:', req.method);
	logger.info('Path:', req.path);
	logger.info('Body:', req.body);

	next();
};

export const unknownEndpoint = (req: Request, res: Response) => {
	res.status(404).send({ error: 'Unknown Endpoint' });
};

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.error(err.message);

	next(err);
};
