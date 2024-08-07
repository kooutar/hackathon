
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
  const query = 'INSERT INTO evenements (titre, description, date_debut, date_fin, lieu, image) VALUES (?, ?, ?, ?,?,?)';
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
  const userId = req.session.userId;
  const query = 'SELECT * FROM evenements';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des événements:', err);
      return res.status(500).send('Erreur lors de la récupération des événements.');
    }

    // Corrigez le chemin des images
    results.forEach(event => {
      if (event.image) {
        // Remplacez les backslashes par des slashes et retirez le préfixe 'public/'
        event.image = event.image.replace(/\\/g, '/').replace('public/', '');
      }
      console.log('Chemin de l\'image corrigé:', event.image);
    });

    res.render('evenements', { 
      evenements: results,
      userId: userId
  });
  });
};