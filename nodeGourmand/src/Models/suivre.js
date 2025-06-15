const {Sequelize ,DataTypes} = require('sequelize')
const { sequelize } = require('../config/database')


 module.exports = (sequelize)=>{

     const suivre = sequelize.define('suivi', {
        id:{
            type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
        },

        idUserSuiveur:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        
        idRecipe:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
       
     });
     return suivre;


 }