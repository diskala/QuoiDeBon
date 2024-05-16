const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageURL: { // Renommée de la colonne image à imageURL pour stocker l'URL de l'image
        type: DataTypes.STRING, // Utilisez STRING ou TEXT
        allowNull: false
    },
    Halal: {
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
    }
});

(async () => {
    await sequelize.sync({ alter: true });
    console.log("Le modèle Recette est synchronisé avec la base de données");
})();

module.exports = Recipe;