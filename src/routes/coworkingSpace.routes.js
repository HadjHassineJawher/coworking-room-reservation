const express = require('express');
const router = express.Router();
const coworkingSpaceController = require('../controllers/coworkingSpace.controller');

router.post('/coworking-space', coworkingSpaceController.create);
router.get('/coworking-space/:coworkingSpaceId', coworkingSpaceController.getById);

module.exports = router;
