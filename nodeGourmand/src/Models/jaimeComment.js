// Models/jaimeComment.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const JaimeComment = sequelize.define('JaimeComment', {
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
    etatJaime: {
      type: DataTypes.BOOLEAN,
      allowNull:false
    }
   });
  //  , {
  //   indexes: [
  //     {
  //       unique: true,
  //       fields: ['userId', 'commentId']
  //     }
  //   ]
  // });

  return JaimeComment;
};