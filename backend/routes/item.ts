import express from 'express';
const router = express.Router();

const ItemController = require('../controllers/item');

router.get('/all', ItemController.getAllItems);

module.exports = router;