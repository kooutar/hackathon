const { db } = require('../config/db');
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
          res.redirect('/evenements');
        }
      } else {
        console.log("Mot de passe ou email incorrect");
        req.flash('message', 'Mot de passe ou email incorrect !');
        res.redirect('/login');
      }
    });
  };