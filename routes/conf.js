// Fichier conf connexion mysql
const  mysql = require('mysql');
const connection = mysql.createConnection({
    host :  'localhost', // adresse du serveur
    user :  'root', // le nom d'utilisateur
    password :  '**********', // le mot de passe
    database :  'Fil_rouge', // le nom de la base de données
});
module.exports = connection;