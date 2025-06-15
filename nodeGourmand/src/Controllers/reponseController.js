const express = require('express');
const session = require('express-session');
const DB = require('../config/database');
const { where } = require('sequelize');
 
 
// const MAX_RETRY_COUNT = 3;

const resCommentaires = async (req, res) => {
    const { id } = req.params;  // Ceci est l'id du commentaire
    const { resComment } = req.body;

    

    if (!id) {

       
        return res.status(401).json({ success: false, message: 'ID du commentaire manque' });
        
    }

    if (!resComment) {
       
        return res.status(400).json({ success: false, message: 'Le commentaire est manquant' });
    }

    try {
        // Récupérer la recette associée au commentaire
        const commentaire = await DB.comment.findByPk(id);
        
        if (!commentaire) {

        
            return res.status(404).json({ success: false, message: 'Commentaire non trouvé' });
        }

        // Créer la réponse en associant la recette
        const newResComments = await DB.reponseModel.create({
            user_id: req.session.userId,
            comment_id: id,
            resComment: resComment,
            recette_id: commentaire.racetteId, // Utiliser la recette associée au commentaire
        });


        // const lesReponse = await DB.reponseModel.findByPk(newResComments.id)
        const notifReponse = await DB.notifReponse.create({
            reponseId:newResComments.id,
            commentId:id,
            userId:commentaire.userId,
            recetteId: commentaire.racetteId
        })

        const fullResComment = await DB.reponseModel.findOne({
            where: { id: newResComments.id },
            include: [{
                model: DB.User,
                attributes: ['firstname']
            }]
        });
      
        // return res.status(201).json(lesReponse);
        return res.status(201).json(fullResComment);
    } catch (error) {
        if (error.code === 'ER_LOCK_DEADLOCK' && attempt < MAX_RETRY_COUNT - 1) {
            console.log('Deadlock détecté, réessayer la transaction...');
        } else {
            console.error('Erreur lors de la création de la réponse:', error);
            return res.status(500).json({ success: false, message: 'Erreur lors de la création de la réponse', error });
        }
    }
};


const getResComment = async (req, res) => {
    const { id } = req.params;  // Ceci est l'id du commentaire

    if (!id) {
        console.log('ID du commentaire manque');
        return res.status(401).json({ success: false, message: 'ID du commentaire manque' });
    }

    try {
        const toutesReponses = await DB.reponseModel.findAll({
            where: { comment_id: id },
            include: [{
                model: DB.User,
                attributes: ['firstname']
            }],
            order: [['createdAt', 'DESC']]
        });

        res.json(toutesReponses);
    } catch (error) {
        console.error('Erreur lors de la récupération des réponses:', error);
        return res.status(500).json({ success: false, message: 'Erreur lors de la récupération des réponses', error });
    }
};

const tousLesReponse = async(req, res)=>{

    try{
        const getTousReponse = await DB.reponseModel.findAll({
            include: [{
                model: DB.User,
                attributes: ['firstname']
            }],
            order: [['createdAt', 'DESC']]
        });
        res.json(getTousReponse);

    }catch(error){
        console.error('Erreur lors de la récupération des réponses:', error);
        return res.status(500).json({ success: false, message: 'Erreur lors de la récupération des réponses', error });
    }

    
}

module.exports = {
    resCommentaires,
    getResComment,
    tousLesReponse
};