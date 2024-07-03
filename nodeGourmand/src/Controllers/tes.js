const express = require('express')
const session = require('express-session')
const GeolocalisationModel = require('../Models/geolocalisation')
const userModels = require('../Models/register')
const {Sequelize}= require('sequelize')

const test = async(req, res)=>{
 
const userId = req.session.userId
const geoSession = await GeolocalisationModel.findOne({
    where: {
        userId: req.session.userId
    },
    order: [['createdAt', 'DESC']]
});
res.json(geoSession)
}
module.exports= test