const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
 
 

module.exports = (sequelize)=>{
// Définir le modèle de données pour les localisations
const geolocalisation = sequelize.define("localisation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
      type: DataTypes.INTEGER, // Assurez-vous que le type correspond à l'ID de l'utilisateur dans votre modèle utilisateur
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
  return geolocalisation;
}

  // Définir la relation entre la géolocalisation et l'utilisateur
// geolocalisation.belongsTo(User); // Une géolocalisation appartient à un utilisateur
  // Synchronisation du modèle avec la base de données
  // (async () => {
  //     await sequelize.sync({ alter: true }); // Ceci créera automatiquement la table si elle n'existe pas
  //     console.log("class geolocalisation est synchronisé avec la base de données");
  //   })();
  