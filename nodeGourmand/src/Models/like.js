const express=require('express')
const { Sequelize, DataTypes } =require('sequelize')
const sequelize=require('../config/database')


module.exports = (sequelize)=>{
    const Like = sequelize.define('like',{

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
    
        },
    
        user_id:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
    
        recette_id:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
    
        etatLike:{
            type: DataTypes.BOOLEAN,
            allowNull:false
        }
    
    });
    
    return Like;
}

// (async()=>{
//     await sequelize.sync({ alter: true });
//     console.log("Le modèle Like est synchronisé avec la base de données");
// })();


 