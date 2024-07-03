const express = require('express')
const session = require('express-session')
const DB =require('../config/database');
const { where } = require('sequelize');

const LikeCommentaire = async(req,res)=>{
   
   
   
    try {

      const {id} = req.params;
    
      const tousComment = await DB.jaimeComment.findOne({where:{
        userId: req.session.userId,
        commentId:id,
        
      }});

      if(!tousComment){
        const likeCommentaire = await DB.jaimeComment.create({
          userId:req.session.userId,
          commentId:id,
          etatJaime: true

        });
      }
      
      const countJaimeComment = await DB.jaimeComment.count({where:{
        commentId:id,
        etatJaime:true
      }})
      
      res.status(201).json({nombreJaimes: countJaimeComment });
    } catch (error) {
      res.status(500).json({ error: 'Erreur réseau lors du like du commentaire' });
    }

};


const getNombreJaimeComment = async(req,res)=>{
  try {
    const { id } = req.params;

    // Comptez le nombre de likes pour cette recette
    const nombreJaimeComment = await DB.jaimeComment.count({
        where: {
            commentId: id,
            etatJaime: true
        }
    });

    res.status(200).json({ nombreJaimes: nombreJaimeComment });
} catch (error) {
    console.error('Erreur lors du comptage des jaime commentaires :', error);
    res.status(500).json({ message: "Erreur lors du comptage des jaimes commentaires." });
}
}

module.exports = {
  LikeCommentaire,
  getNombreJaimeComment
}
