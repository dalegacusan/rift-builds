const buildRouter = require('./routes/build');
const championRouter = require('./routes/champion');
const itemRouter = require('./routes/item');

module.exports = (app) => {
	app.use('/api/build', buildRouter);
	app.use('/api/champion', championRouter);
	app.use('/api/item', itemRouter);
};
