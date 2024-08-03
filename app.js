const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const multer = require('multer');
const authRoutes = require('./routes/authRoutes');
const actulaiteRoutes = require('./routes/actulaiteRoutes');
const eventRoutes =require('./routes/eventRoutes');
// const { db } = require('./config/db');

const app = express();

// Configuration de l'application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configuration de multer pour le stockage des fichiers uploadés
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// Middleware pour la gestion des sessions
app.use(session({
  secret: '123456',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Middleware pour les messages flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.message = req.flash('message');
  next();
});

// Routes
app.use('/', authRoutes);
app.use('/actuialite', actulaiteRoutes);//upload.single('imgActulaite')
app.use('/evenements', eventRoutes);//, upload.single('imgevent')

// Gestion des erreurs
// app.use((req, res, next) => {
//   res.status(404).render('error', { message: 'Page non trouvée' });
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).render('error', { message: 'Erreur interne du serveur' });
// });

app.get('/index', (req, res) => {
    res.render('index');
  });
  app.get('/admin', (req, res) => {
    res.render('admin');
  });
  app.get('/evenement', (req, res) => {
    res.render('evenement');
  });

// Démarrer le serveur
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
