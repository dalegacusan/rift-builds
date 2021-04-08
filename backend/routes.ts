import express from 'express';

const buildRouter = require('./routes/build');
const championRouter = require('./routes/champion');
const itemRouter = require('./routes/item');
const rankRouter = require('./routes/rank');
const roleRouter = require('./routes/role');
const runeRouter = require('./routes/rune');
const spellRouter = require('./routes/spell');

module.exports = (app: express.Application) => {
	app.use('/api/build', buildRouter);
	app.use('/api/champion', championRouter);
	app.use('/api/item', itemRouter);
	app.use('/api/rank', rankRouter);
	app.use('/api/role', roleRouter);
	app.use('/api/rune', runeRouter);
	app.use('/api/spell', spellRouter);
};
