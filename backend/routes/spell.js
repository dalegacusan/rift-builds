const express = require('express');
const router = express.Router();

const SpellController = require('../controllers/spell');

router.get('/all', SpellController.getAllSpells);

module.exports = router;