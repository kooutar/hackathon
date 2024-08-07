const {db} = require('../config/db'); // Assurez-vous d'avoir le bon chemin pour votre module de connexion DB

// Fonction pour afficher les détails de l'événement pour la candidature
exports.getCandidature = (req, res) => {
  const eventId = req.params.id;
  console.log('id event est ', eventId);
  const query = 'SELECT titre, image FROM evenements WHERE id = ?';
  db.query(query, [eventId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'événement:', err);
      return res.status(500).send('Erreur lors de la récupération de l\'événement.');
    }
    if (results.length === 0) {
      return res.status(404).send('Événement non trouvé.');
    }
    
    // Ajoutez le console.log ici pour vérifier le chemin de l'image
    // Corrigez le chemin des images
    results.forEach(event => {
        if (event.image) {
          // Remplacez les backslashes par des slashes et retirez le préfixe 'public/'
          event.image = event.image.replace(/\\/g, '/').replace('public/', '');
        }
        console.log('Chemin de l\'image corrigé:', event.image);
      });

    res.render('candidater', { 
      evenement: results[0], 
      id: eventId, 
      image: results[0].image 
    });
  });
};


exports.submitInscription = (req, res) => {
  const userId = req.session.userId; // ID de l'utilisateur connecté stocké dans la session
  const eventId = req.body.eventId;  // ID de l'événement provenant du corps de la requête

  console.log('submit id', userId);
  console.log('submit event', eventId);

  const query = 'INSERT INTO candidature (utilisateur_id, evenement_id) VALUES (?, ?)';
  db.query(query, [userId, eventId], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'inscription:', err);
      return res.status(500).send('Erreur lors de l\'inscription.');
    }

    req.flash('message', 'Votre inscription a été effectuée avec succès. Merci de patienter pour l\'acceptation !');
    res.redirect('/evenements'); // Redirige vers la liste des événements après l'inscription
  });
};


