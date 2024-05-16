const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
 
   
  // Définition du modèle User
  const User = sequelize.define('Utilisateur', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // Supprimer la contrainte d'unicité pour éviter le conflit
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
      },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
      }

});
  
  // Synchronisation du modèle avec la base de données
  (async () => {
    await sequelize.sync({ alter: true }); // Ceci créera automatiquement la table si elle n'existe pas
    console.log("Le modele utilisateur est sychronisé avec la base de données");
  })();
  
  module.exports = User;