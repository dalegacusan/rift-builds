const express = require('express');
const router = express.Router();

const BuildController = require('../controllers/build');

router.get('/all', BuildController.getAllBuilds);

router.post('/save', BuildController.saveBuild);

module.exports = router;