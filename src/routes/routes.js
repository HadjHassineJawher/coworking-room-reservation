const express = require('express');
const path = require('path');
const router = express.Router();

router.use(express.static(path.join(__dirname, '../public')));

router.get('/', (req, res) => {
  const filePath = path.resolve(__dirname, '../public/index.html');
  res.sendFile(filePath);
});

module.exports = router;
