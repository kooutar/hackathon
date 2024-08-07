const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const authRoutes = require('./routes/authRoutes');
const actulaiteRoutes = require('./routes/actulaiteRoutes');
const eventRoutes =require('./routes/eventRoutes');
const loginRoutes=require('./routes/loginRoutes');
const candidatureRoutes=require('./routes/candidatureRoutes');
// const { db } = require('./config/db');

const app = express();

// Configuration de l'application

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



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
app.use('/candidater', candidatureRoutes);
app.use('/evenements', eventRoutes);//, upload.single('imgevent')
app.use('/login',loginRoutes);
app.use('/index', authRoutes);
app.use('/actuialite', actulaiteRoutes);//upload.single('imgActulaite')


app.get('/index', (req, res) => {
    res.render('index');
  });
  app.get('/admin', (req, res) => {
    res.render('admin');
  });
  app.get('/evenement', (req, res) => {
    res.render('evenement');
  });
  app.get('/evenements', (req, res) => {
    res.render('evenements');
  });
  app.get('/actuialite', (req, res) => {
    res.render('actuialite');
  });
  
  app.get('/login', (req, res) => {
    res.render('login');
  });
  app.get('/candidater', (req, res) => {
    res.render('candidater');
  });
 app.get('/', (req, res) => {
    res.render('home');
  });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});

