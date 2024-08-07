console.log('je suis en authroute')
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
router.post('/inscription', authController.registerUser);
module.exports = router;

