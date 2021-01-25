const express = require('express');
const router = express.Router();

const RankController = require('../controllers/rank');

router.get('/all', RankController.getAllRanks);

module.exports = router;