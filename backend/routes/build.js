const express = require('express');
const router = express.Router();
const rateLimit = require("express-rate-limit");
const BuildController = require('../controllers/build');

const createBuildLimiter = rateLimit({
	windowMs: 30 * 60 * 1000, // 30 minute window - in milliseconds(ms)
	max: 5, // start blocking after 5 requests
	message:
		"You're creating too many builds. Please try again after 30 minutes."
});

// Returns 5 documents every time
router.post('/all', BuildController.getAllBuilds);

// Get one build
router.get('/:buildId', BuildController.getOneBuild);

// Get builds for one champion
router.post('/all/:championName', BuildController.getAllBuildsForChampion);

router.post('/save', createBuildLimiter, BuildController.saveBuild);

module.exports = router;