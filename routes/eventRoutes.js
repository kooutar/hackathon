console.log('je suis en eventhroute')
const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Configuration de multer pour les fichiers uploadés
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.get('/evenement', (req, res) => {
  res.render('evenement');
});


//  router.post('/evenement',upload.single('imgevent') , eventController.addevent);



router.post('/event', upload.single('imgevent'), (req, res, next) => {
  console.log("Requête POST /event reçue");
  next(); // Passe au contrôleur
}, eventController.addevent);
module.exports = router;
