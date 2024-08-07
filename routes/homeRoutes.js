console.log('home')
const express = require('express');
const router = express.Router();
const authController = require('../controllers/homeController');

router.get('/', (req, res) => {
  res.render('home');
});

module.exports = router;