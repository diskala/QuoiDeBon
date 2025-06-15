const express= require('express');
const session = require('express-session');
const DB = require('../config/database');
const { where } = require('sequelize');
const { Op } = require('sequelize'); // Assurez-vous d'importer Op

const messagerie = async(req,res)=>{
           
    try{
        const {id} = req.params; // id de celui qui recois le message
        const {idEnvois} = req.params
        const message = req.body.messages

        if(!req.session.userId){
           return res.status(401).json({success: false , message: 'Utilisateur n\'est pas connecté'})
        }

        const utilisateur = await DB.User.findOne({where:{
            id: id 
           

        }});
         
        if(message){
        const newMessage = await DB.messagerie.create({
            idUserEnvois: req.session.userId,
            idUserRecois: utilisateur.id,
            messages: req.body.messages
            
        })
// 💥 Envoi du message à tous les clients connectés
            req.io.emit("receive_message", newMessage);
        res.json(utilisateur)
    }



    }catch(error){
        console.error('une erreur est survenu lors de la recuperation des message', error);
        res.status(500).json({error, message:'une erreur de serveur est servenu', error})
    }

};


const getMessage = async(req, res)=>{
      
    try{
      const {id}= req.params

      if(!req.session.userId){
        return res.status(401).json({status:false, message:"l\'utilisateur n\'est pas connecté"})

      }

      const userConnect = await DB.User.findOne({where:{
        id:req.session.userId
      }});

      
      const messagesEnvoyer = await DB.messagerie.findAll({
        where: {
            [Op.or]: [
                {
                    idUserRecois: id,
                    idUserEnvois: req.session.userId
                },
                {
                    idUserRecois: req.session.userId,
                    idUserEnvois: id
                }
            ]
        },
        include: [{
            model: DB.User, // Assurez-vous que 'DB.User' est correctement importé et configuré
            
        }],
        order: [['createdAt', 'DESC']]
    });

    // Inclure userConnect dans chaque message
    const messagesWithUserConnect = messagesEnvoyer.map(message => ({
        ...message.toJSON(), // Convertir l'instance du modèle en objet JSON
        userConnect: userConnect.toJSON() // Inclure les informations de userConnect
      }));
    
    return res.status(200).json(messagesWithUserConnect);

    }catch(error){
        console.error("une erreur est survenu lors de la récupération des messages ", error);
        res.status(500).json({error, message:"une erreur de serveur", error})
    }



};

const getTousMessage = async (req, res) => {
    try {
        const allMessage = await DB.messagerie.findAll({
            include: [
                {
                    model: DB.User,
                    as: 'userEnvois',
                    attributes: ['id', 'firstname'] // Spécifiez les attributs que vous souhaitez inclure
                },
                {
                    model: DB.User,
                    as: 'userRecois',
                    attributes: ['id', 'firstname'] // Spécifiez les attributs que vous souhaitez inclure
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json(allMessage);
    } catch (error) { // Passez l'objet error ici
        console.error("Erreur lors de la récupération des messages:", error);
        res.status(500).json({ error, message: "Une erreur de serveur est survenue" });
    }
};

module.exports= {
    messagerie,
    getMessage,
    getTousMessage
}