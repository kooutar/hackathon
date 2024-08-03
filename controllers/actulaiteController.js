console.log('actualite');
const { db } = require('../config/db');

exports.addActulaite = (req, res) => {
  if (!req.file) {
    return res.status(400).send('Le téléchargement de l\'image est obligatoire.');
  }

  const { titre, discription, date } = req.body;
  const imgActulaite = req.file.path;
  console.log(imgActulaite);
  const query = 'INSERT INTO actulaite (titre, contenu, date_publication, image) VALUES (?, ?, ?, ?)';
  db.query(query, [titre, discription, date, imgActulaite], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion des données :', err);
      return res.status(500).send('Erreur lors de l\'insertion des données.');
    }
    console.log('Données enregistrées avec succès.');
    res.redirect('/actuialite');
  });
};

exports.getActulaite = (req, res) => {
  const query = 'SELECT * FROM actulaite';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données :', err);
      return res.status(500).send('Erreur lors de la récupération des données.');
    }
    res.render('actuialite', { actuialites: results });
  });
};
