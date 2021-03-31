if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const app = express();

let MONGODB_URL = config.MONGODB_URL;

if (config.NODE_ENV === 'test') {
	MONGODB_URL = config.TEST_MONGODB_URL;
}

mongoose.connect(
	MONGODB_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	},
)
	.then(() => {
		logger.info('Successfully connected to MongoDB!');
	})
	.catch((err) => {
		logger.error('Error connecting to MongoDB:', err.message);

		// Exits the program if there's no connection to the Database
		process.exit(1);
	});

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.set('trust proxy', 1); // For express-rate-limit
app.use(middleware.requestLogger);

app.get('/', (req, res) => {
	res.status(200).redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
})

// Set up routes
require('./routes')(app);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`);
});

module.exports = app;