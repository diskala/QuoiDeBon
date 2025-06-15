const { Sequelize, DataTypes}=require('sequelize');
const sequelize = require('../config/database')

module.exports = (sequelize)=>{

    const contact = sequelize.define('contact',{

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        firstname:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        contenu:{
            type: DataTypes.TEXT,
            allowNull: false,
        }
    });

    return contact;


}