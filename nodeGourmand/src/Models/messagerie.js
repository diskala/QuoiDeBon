const express=require('express')
const {Sequelize, DataTypes}= require('sequelize')
const sequelize= require('../config/database')

module.exports = (sequelize)=>{
    const messagerie = sequelize.define('message',{
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },

      idUserEnvois:{
        type: DataTypes.INTEGER,
        allowNull:false
      },

      idUserRecois:{
        type: DataTypes.INTEGER,
        allowNull:false
      },

      messages:{
        type: DataTypes.TEXT,
        allowNull:true
      }
    });

    
    return messagerie
}