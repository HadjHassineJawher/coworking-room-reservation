const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const multer = require('multer');
const upload = multer();

router.post('/register', userController.createUser);
router.patch('/join-coworking-space', userController.joinCoworkingSpace);
router.get(
  '/users/:userId/coworking-spaces',
  userController.getUserCoworkingSpaces,
);
router.patch(
  '/users/:userId',
  upload.single('profileImage'),
  userController.updateUser,
);

module.exports = router;
