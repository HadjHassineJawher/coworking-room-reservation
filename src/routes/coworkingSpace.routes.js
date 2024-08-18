const express = require('express');
const router = express.Router();
const coworkingSpaceController = require('../controllers/coworkingSpace.controller');

router.post('/coworking-space', coworkingSpaceController.create);

module.exports = router;
