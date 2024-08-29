const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/register', userController.createUser);
router.patch('/join-coworking-space', userController.joinCoworkingSpace);
router.get(
  '/users/:userId/coworking-spaces',
  userController.getUserCoworkingSpaces,
);
router.patch('/users/:userId', userController.updateUser);
router.post('/login', userController.loginUser);

module.exports = router;
