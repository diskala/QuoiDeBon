const {Sequelize, DataTypes}=require('sequelize');
const { sequelize } = require('../config/database');

module.exports = (sequelize)=>{
    const notifReponse = sequelize.define('notifreponse',{
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

        recetteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reponseId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        viewed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });
    return notifReponse;
    
}