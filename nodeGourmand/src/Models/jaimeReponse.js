// Models/jaimeReponse.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const JaimeReponse = sequelize.define('JaimeReponse', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reponseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    etatReponse: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }); 

  return JaimeReponse;
};