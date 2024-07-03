const express = require('express');
const session = require('express-session');
const DB = require('../config/database');
const { where } = require('sequelize');
// const modelUser = require('../Models/register');
// const Like = require('../Models/like');
// const Recipe = require('../Models/reccette');

const postLike = async (req, res) => {
    try {
        const { id } = req.params;
       
        const existingLike = await DB.Like.findOne({ 
            where: {
              user_id: req.session.userId,
              recette_id: id,
            }
          });
          
          if (!existingLike) {
            // Créer un nouveau like s'il n'existe pas
            const newLike = await DB.Like.create({
              user_id: req.session.userId, // Remplacez par l'ID de l'utilisateur actuel
              recette_id: id,
              etatLike: true
            });
          }
       
           
     

        // const newLike = await DB.Like.create({
        //     user_id: req.session.userId, // Remplacez par l'ID de l'utilisateur actuel
        //     recette_id: id,
        //     etatLike: true
        // });

        // Comptez le nombre de likes pour cette recette
        const likeCount = await DB.Like.count({
            where: {
                recette_id: id,
                etatLike: true
            }
        });

        res.status(200).json({ nombreLikes: likeCount });
    } catch (error) {
        console.error('Erreur lors du chargement des likes :', error);
        res.status(500).json({ message: "Erreur lors du chargement des likes." });
    }
};

const countLikes = async (req, res) => {
    try {
        const { id } = req.params;

 // Comptez le nombre de likes pour cette recette
 const likeCount = await DB.Like.count({
    where: {
        recette_id: id,
        etatLike: true
    }
});

         const oneLike = await DB.Like.findOne({where:{recette_id:id},
        
            
        })
       

        res.status(200).json( {nombreLikes:likeCount});
    } catch (error) {
        console.error('Erreur lors du comptage des likes :', error);
        res.status(500).json({ message: "Erreur lors du comptage des likes." });
    }
};

module.exports = {
    postLike,
    countLikes
};