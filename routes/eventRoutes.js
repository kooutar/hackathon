console.log('je suis en eventhroute')
const express = require('express');
const multer = require('multer');
const path=require('path');
const router = express.Router();
const eventController = require('../controllers/eventController');

const storageEvent = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const uploadEvent = multer({ storage: storageEvent });

router.get('/', (req, res) => {
  console.log('Route get /evenements atteinte');
  eventController.getevent(req, res);
});

router.post('/', uploadEvent.single('imgEvent'), (req, res, next) => {
  console.log("Requête POST /evenements reçue");
  console.log("Fichier reçu :", req.file);
  console.log("Corps de la requête :", req.body);
  next(); // Passe au contrôleur C:\Users\hp\Desktop\test\public\uploads\1722720080026.jpeg
 
  //
},eventController.addevent);

module.exports = router;
