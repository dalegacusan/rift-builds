import express from 'express';
const router = express.Router();

const RoleController = require('../controllers/role');

router.get('/all', RoleController.getAllRoles);

module.exports = router;