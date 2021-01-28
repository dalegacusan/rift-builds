const express = require('express');
const router = express.Router();
const rateLimit = require("express-rate-limit");
const BuildController = require('../controllers/build');

const createBuildLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minute window
	max: 5, // start blocking after 5 requests
	message:
		"You're creating too many builds. Please try again after 5 minutes."
});

router.post('/all', BuildController.getAllBuilds);

// Individual Hero
router.post('/all/:heroId', BuildController.getBuildsForHero);

// Individual Build
router.get('/:buildId', BuildController.getBuild);

router.post('/save', createBuildLimiter, BuildController.saveBuild);

module.exports = router;