const { db } = require('../config/db');
exports.registerUser = (req, res) => {
  const { nom, prenom, telephone, email, adresse, profession, organisation, mot_de_passe } = req.body;

  const sql1 = "SELECT * FROM utilisateurs WHERE email=?";
  db.query(sql1, [email], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification de l\'email :', err);
      return res.status(500).send('Erreur lors de la vérification de l\'email');
    }
    
    if (results.length > 0) {
      console.log('Email existe déjà en base de données');
      req.flash('message', 'Email déjà enregistré !');
      return res.redirect('/index');
    } else {
      const sql = `INSERT INTO utilisateurs (nom, prenom, telephone, email, adresse, profession, organisation, mot_de_passe, role)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Utilisateur')`;

      db.query(sql, [nom, prenom, telephone, email, adresse, profession, organisation, mot_de_passe], (err, result) => {
        if (err) {
          console.error('Erreur lors de l\'insertion de l\'utilisateur :', err);
          res.status(500).send('Erreur serveur');
        } else {
          console.log('Inscription réussie !');
          req.flash('message', 'Inscription réussie !');
          return res.redirect('/index');
        }
      });
    }
  });
};

exports.loginUser = (req, res) => {
  const { mail, password } = req.body;
  const sql = 'SELECT role FROM utilisateurs WHERE email = ? AND mot_de_passe = ?';
  db.query(sql, [mail, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête de connexion :', err);
      return res.status(500).json({ message: 'Erreur lors de la connexion : ' + err.message });
    }
    if (results.length > 0) {
      const role = results[0].role;
      if (role === 'Administrateur') {
        res.redirect('/admin');
      } else {
        res.redirect('/actuialite');
      }
    } else {
      console.log("Mot de passe ou email incorrect");
      req.flash('message', 'Mot de passe ou email incorrect !');
      res.redirect('/login');
    }
  });
};
