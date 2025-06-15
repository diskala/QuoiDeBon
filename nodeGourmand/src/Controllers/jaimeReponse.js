const express = require('express')
const session = require('express-session');
const DB = require('../config/database');
const { where } = require('sequelize');
 

 

const postJaimeReponse = async(req,res)=>{

  try{

    const {id, Idcommentaire} = req.params;
    
    const tousJaimesReponse = await DB.jaimeReponse.findOne({where:{
      userId:req.session.userId,
      commentId:Idcommentaire,
      reponseId:id
     
    }});

    if(!tousJaimesReponse){
      const chargerJaimeReponse = await DB.jaimeReponse.create({
        userId:req.session.userId,
        commentId:Idcommentaire,
        reponseId:id,
        etatReponse:true
      })
    }


        const nombreTousJaimeReponse = await DB.jaimeReponse.count({where:{
            commentId:Idcommentaire,
            reponseId:id,
            etatReponse:true
        }});
        
        res.json({nombreJaimesReponse:nombreTousJaimeReponse})

  }catch (error){
 console.error('Erreur lors du comptage des jaime reponse commentaire:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

const getJaimeReponse = async(req,res)=>{

   try{
    const {id, Idcommentaire} = req.params;

    const nombreJaimesReponse = await DB.jaimeReponse.count({where:{
      commentId:Idcommentaire,
      reponseId:id,
      etatReponse:true
    }
    })
    res.status(200).json({ nombreJaimesReponse: nombreJaimesReponse });
   }catch(error){
    console.error('Erreur lors du comptage des jaime reponse commentaire:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
   }

}


module.exports={
   postJaimeReponse,
   getJaimeReponse
  }