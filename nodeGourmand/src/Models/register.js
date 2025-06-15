const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database')

module.exports = (sequelize)=>{

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
    unique: false // Supprimer la contrainte d'unicité
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
  },
  photoProfil: { // Renommée de la colonne image à imageURL pour stocker l'URL de l'image
    type: DataTypes.STRING, // Utilisez STRING ou TEXT
    allowNull: false
},
 latitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  }

});


  return User;
}




// Synchronisation du modèle avec la base de données
// (async () => {
//   await sequelize.sync({ alter: true }); // Ceci créera automatiquement la table si elle n'existe pas
//   console.log("Le modèle utilisateur est synchronisé avec la base de données");
// })();

 
