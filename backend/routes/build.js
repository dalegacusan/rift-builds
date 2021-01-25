const express = require('express');
const router = express.Router();

const BuildController = require('../controllers/build');

router.post('/all', BuildController.getAllBuilds);

router.post('/all/:heroId', BuildController.getBuildForHero);

router.post('/save', BuildController.saveBuild);

module.exports = router;