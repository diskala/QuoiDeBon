const { DataTypes } = require("sequelize");
 
module.exports = (sequelize)=>{

    const Recipe = sequelize.define("recette", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageURL_1: { // Renommée de la colonne image à imageURL pour stocker l'URL de l'image
            type: DataTypes.STRING, // Utilisez STRING ou TEXT
            allowNull: false
        },

        imageURL_2: { // Renommée de la colonne image à imageURL pour stocker l'URL de l'image
            type: DataTypes.STRING, // Utilisez STRING ou TEXT
            allowNull: false
        },
        imageURL_3: { // Renommée de la colonne image à imageURL pour stocker l'URL de l'image
            type: DataTypes.STRING, // Utilisez STRING ou TEXT
            allowNull: false
        },
       
        halal: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false // Définit la valeur par défaut à false
        },
        sweet: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        salty: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          longitude: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          videoURL: { // Nouvelle colonne pour l'URL de la vidéo
            type: DataTypes.STRING,
            allowNull: true
        },
    });
    
    return Recipe;
}

// (async () => {
//     await sequelize.sync({ alter: true });
//     console.log("Le modèle Recette est synchronisé avec la base de données");
// })();

 