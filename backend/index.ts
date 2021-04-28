import { Process } from './shared/constants/Process';

if (process.env.NODE_ENV !== Process.PRODUCTION) {
	require('dotenv').config();
}

import express, { Request, Response } from 'express';
import { CorsOptions } from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

const config = require('./shared/config/config');
const logger = require('./shared/utils/logger');
const middleware = require('./shared/utils/middleware');

const app: express.Application = express();

let DATABASE_URI;

switch (config.NODE_ENV) {
	case Process.PRODUCTION:
		DATABASE_URI = config.PROD_MONGODB_URI;
		break;
	case Process.DEVELOPMENT:
		DATABASE_URI = config.DEV_MONGODB_URI;
		break;
	case Process.TEST:
		DATABASE_URI = config.TEST_MONGODB_URI;
		break;
}

// Needs to be a template literal or you get undefined
mongoose
	.connect(`${DATABASE_URI}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		logger.info(`${config.NODE_ENV} Mode`);
		logger.info('Successfully connected to MongoDB!');
	})
	.catch((err: Error) => {
		logger.error('Error connecting to MongoDB:', err.message);

		// Exits the program if there's no connection to the Database
		process.exit(1);
	});

// For future whitelists
var whitelist = ['https://riftbuilds.net'];
var corsOptions: CorsOptions = {
	origin: function (origin: any, callback: any) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', 1); // For express-rate-limit
app.use(middleware.requestLogger);

app.get('/', (req: Request, res: Response) => {
	res.status(200).redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
});

// Set up routes
require('./routes')(app);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
	logger.info(`Server is running on port ${config.PORT}`);
});

module.exports = app;
