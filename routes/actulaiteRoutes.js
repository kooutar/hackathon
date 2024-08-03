const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const actulaiteController = require('../controllers/actulaiteController');
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

router.get('/', actulaiteController.getActulaite);
router.post('/', upload.single('imgActulaite'), (req, res, next) => {
    console.log("Requête POST /actulaite reçue");
    next(); // Passe au contrôleur
},actulaiteController.addActulaite);

module.exports = router;
