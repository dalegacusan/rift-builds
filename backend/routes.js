const buildRouter = require('./routes/build');
const championRouter = require('./routes/champion');
const itemRouter = require('./routes/item');
const rankRouter = require('./routes/rank');
const runeRouter = require('./routes/rune');

module.exports = (app) => {
	app.use('/api/build', buildRouter);
	app.use('/api/champion', championRouter);
	app.use('/api/item', itemRouter);
	app.use('/api/rank', rankRouter);
	app.use('/api/rune', runeRouter);
};
