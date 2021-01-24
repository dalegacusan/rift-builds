const logger = require('./logger');

const requestLogger = (req, res, next) => {
	logger.info('\nMethod:', req.method);
	logger.info('Path:', req.path);
	logger.info('Body:', req.body);

	next();
};

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'Unknown Endpoint' });
};

const errorHandler = (err, req, res, next) => {
	logger.error(err.message);

	next(err);
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
};
