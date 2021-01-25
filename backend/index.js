const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const app = express();

mongoose.connect(
	config.MONGODB_URL,
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(middleware.requestLogger);

// Set up routes
require('./routes')(app);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(process.env.PORT || config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`);
});