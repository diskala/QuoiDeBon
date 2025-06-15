const express = require('express')
const DB = require('../config/database')
 

const allRecipes= async(req, res)=>{
try{
    const tousLesRecettes = await DB.recette.findAll({
        include: [{
            model: DB.User,
            // attributes: ['firstname']
        }],
        order: [['createdAt', 'DESC']]
    });
    console.log("Recettes récupérées avec succès", tousLesRecettes);
    res.status(200).json(tousLesRecettes);
}catch (error){
    console.error("Erreur lors de la récupération des recettes", error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des recettes.' });
}
   
}
module.exports = allRecipes