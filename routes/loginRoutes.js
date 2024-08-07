console.log('je suis en loginRouts')
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/', (req, res) => {
  console.log('Route POST /login atteinte');
  loginController.loginUser(req, res);
});

module.exports = router;
