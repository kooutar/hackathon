console.log('je suis en authroute')
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/inscription', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;

