// Import module express
import express from 'express';
const port = 3000;

//importer la configuration mysql 
const connection = require('./conf');

const router = express.Router();

//GET - Récupération de l'ensemble des données de ta table
// écoute de l'url "/api/systeme solaire"
router.get('/', (req, res) => {
  // connection à la base de données, et sélection du systeme solaire
  connection.query('SELECT * from Systeme_solaire', (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des données de la table');
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

//GET (light) - Récupération de quelques champs spécifiques:
//////Nom planete:
// écoute de l'url "/api/systeme solaire"
router.get('/api/systeme/name', (req, res) => {
  // connection à la base de données, et sélection du nom des planêtes
  connection.query('SELECT name_planete FROM Systeme_solaire', (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération du nom de la planête');
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

//////Nombre de missions
// écoute de l'url "/api/systeme solaire"
router.get('/api/systeme/nbmission', (req, res) => {
  // connection à la base de données, et sélection du nombre de mission
  connection.query('SELECT nb_mission FROM Systeme_solaire', (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération du nombre de mission');
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

//GET - Récupération d'un ensemble de données en fonction de certains filtres :
//////filtre contient:
// écoute de l'url "/api/systeme solaire"
router.get('/api/systeme/filtre/:country', (req, res) => {
  // connection à la base de données, et sélection des pays
  const country = req.params.country;
  connection.query(`SELECT * FROM Systeme_solaire WHERE Country LIKE '${ country}%'`, country, (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des pays contenant...');
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

//////filtre commence:
// écoute de l'url "/api/systeme solaire"
router.get('/api/systeme/start/:name', (req, res) => {
  // connection à la base de données, et sélection des nom de planête
  const name = req.params.name;
  connection.query(`SELECT * FROM Systeme_solaire WHERE name_planete LIKE '${ name }%'`, name, (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération du nom de la planête commençant par...');
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

//////filtre supérieur à:  
// écoute de l'url "/api/systeme solaire"
router.get('/api/systeme/more/:date', (req, res) => {
  // connection à la base de données, et sélection des dates de mission
  const date = req.params.date;
  connection.query(`SELECT * FROM Systeme_solaire WHERE last_mission > '${ date }%'`, date, (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des missions depuis 2000');
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

//GET - Récupération de données ordonnées (ascendant, descendant)
// écoute de l'url "/api/systeme solaire"
router.get('/api/systeme/order', (req, res) => {
  // connection à la base de données, et sélection du nombre de mission
  const type = req.query.type;
  const sql = (type === 'desc') ?
    'SELECT * FROM Systeme_solaire ORDER BY nb_mission DESC' :
    'SELECT * FROM Systeme_solaire ORDER BY nb_mission ASC';
  connection.query(sql, (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.sendStatus(500).send('Erreur lors de la récupération des missions depuis 2000');
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  })
});

//POST - Sauvegarde d'une nouvelle entité

const bodyParser = require('body-parser');
// Support JSON-encoded bodies
router.use(bodyParser.json());
// Support URL-encoded bodies
router.use(bodyParser.urlencoded({
  extended: true
}));

// écoute de l'url "/api/systeme solaire"
router.post('/api/systeme', (req, res) => {

  // récupération des données envoyées
  const formData = req.body;

  // connection à la base de données, et insertion dans le systeme solaire
  connection.query('INSERT INTO Systeme_solaire SET ?', formData, (err, results) => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde dans le système solaire");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

// PUT - Modification d'une entité

// écoute de l'url "/api/systeme"
router.put('/api/systeme/modif/:id', (req, res) => {


  // connection à la base de données, et insertion dans le systeme solaire
  connection.query(`UPDATE Systeme_solaire SET Country = 'Europe-USA' WHERE id = 5`, err => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un pays");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

//PUT - Toggle du booléen
// écoute de l'url "/api/systeme solaire"
router.put('/api/systeme/toggle/newmission', (req, res) => {


  // connection à la base de données, et insertion de nouvelle mission en cours
  connection.query(`UPDATE Systeme_solaire SET new_mission = 1 - new_mission`, err => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un pays");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

//DELETE - Suppression d'une entité

// écoute de l'url "/api/systeme solaire"
router.delete('/api/systeme/del/:id', (req, res) => {

  // récupération des données envoyées
  const idSysteme = req.params.id;

  // connexion à la base de données, et suppression dans le systeme solaire
  connection.query('DELETE FROM Systeme_solaire WHERE id = ?', [idSysteme], err => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un élément du système solaire");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

//DELETE - Suppression de toutes les entités dont le booléen est false
// écoute de l'url "/api/systeme solaire"
router.delete('/api/systeme/boolean/newmission', (req, res) => {

  // connexion à la base de données, et suppression dans le systeme solaire
  connection.query(`DELETE FROM Systeme_solaire WHERE new_mission = 0 `, err => {

    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un élément du système solaire");
    } else {

      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});


export default router;