const express = require('express');
const router = express.Router();

const BuildController = require('../controllers/build');

router.post('/all', BuildController.getAllBuilds);

// Individual Hero
router.post('/all/:heroId', BuildController.getBuildForHero);

// Individual Build
router.get('/:buildId', BuildController.getBuild);

router.post('/save', BuildController.saveBuild);

module.exports = router;