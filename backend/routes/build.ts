import { Message } from '../shared/constants/validationMessages';
const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const BuildController = require('../controllers/build');

const createBuildLimiter = rateLimit({
	windowMs: 30 * 60 * 1000, // 30 minute window - in milliseconds(ms)
	max: 6, // start blocking after 6 requests
	message: Message.ERROR.BUILD.CREATING_TOO_MANY_BUILDS,
});

// Get one build
router.get('/:buildId', BuildController.getOneBuild);

// Get builds for one champion
router.post('/all/:championName', BuildController.getAllBuildsForChampion);

router.post('/save', createBuildLimiter, BuildController.saveBuild);

module.exports = router;
