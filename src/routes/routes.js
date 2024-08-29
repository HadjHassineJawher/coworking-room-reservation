const express = require('express');
const path = require('path');
const router = express.Router();
const userRoutes = require('./user.routes');
const coworkingSpaceRoutes = require('./coworkingSpace.routes');

router.use(express.static(path.join(__dirname, '../../public')));

router.get('/', (req, res) => {
  const filePath = path.resolve(__dirname, '../../public/index.html');
  res.sendFile(filePath);
});

router.use('/', userRoutes);
router.use('/', coworkingSpaceRoutes);

module.exports = router;
