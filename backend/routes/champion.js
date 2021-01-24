const express = require('express');
const router = express.Router();

const ChampionController = require('../controllers/champion');

router.get('/all', ChampionController.getAllChampions);

module.exports = router;