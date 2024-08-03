
console.log('je suis en eventController');
const { db } = require('../config/db');

exports.addevent = (req, res) => {
    console.log("Fonction createEvent appelée")
  if (!req.file) {
    return res.status(400).send('Le téléchargement de l\'image est obligatoire.');
  }

  const { titre, discription, date_debut, date_fin, lieu } = req.body;
  const imgevents = req.file.path;
  console.log(imgevents);
  const query = 'INSERT INTO evenement (titre, description, date_debut, date_fin, lieu, image) VALUES (?, ?, ?, ?)';
  db.query(query, [titre, discription, date_debut, date_fin, lieu,imgevents], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion des données :', err);
      return res.status(500).send('Erreur lors de l\'insertion des données.');
    }
    console.log('Données enregistrées avec succès.');
    res.redirect('/evenements');
  });
};

exports.getevent = (req, res) => {
  const query = 'SELECT * FROM evenement';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données :', err);
      return res.status(500).send('Erreur lors de la récupération des données.');
    }
    res.render('evenements', { evenemnts: results });
  });
};