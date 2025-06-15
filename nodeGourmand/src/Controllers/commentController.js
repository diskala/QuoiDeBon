const express = require('express')
const session = require('express-session');
const DB = require('../config/database');
// const { io } = require('../../index'); // Ajustez le chemin selon votre structure de projet
 
 

const lesComentes = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(401).json({ success: false, message: 'ID de la recette manque' });
    }

    const comment = req.body.comment;
    const likeComment = req.body.likeComment;

    if (comment) {
        try {
            const newComment = await DB.comment.create({
                userId: req.session.userId,
                racetteId: id,
                comment
               
            });

            

            const recette = await DB.recette.findByPk(id); // Assurez-vous que 'Recette' est bien importé
            const notification = await DB.notifModel.create({
                userId: recette.userId, // L'utilisateur qui a créé la recette
                commentId: newComment.id,
                recetteId:id
            });
            
            const fullComment = await DB.comment.findOne({
                where: { id: newComment.id },
                include: [{
                    model: DB.User,
                    attributes: ['firstname']
                }]
            });
        //  req.io.emit('receiveComment', fullComment); // Émettre l'événement de commentaire à tous les clients connectés
            //  // Émettre un événement de notification
            // io.to(recette.userId).emit('newNotification', {
            //     comment: fullComment,
            //     userId: req.session.userId
            // });

            return res.status(201).json(fullComment);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Erreur lors de la création du commentaire', error });
        }
    } else {
        return res.status(400).json({ success: false, message: 'Le commentaire est manquant' });
    }
};


const getCommentaire = async(req, res)=>{
    const { id } = req.params;

    if (!id) {
        return res.status(401).json({ success: false, message: 'ID de la recette manque' });
    }
    
    try {
        const tousComments = await DB.comment.findAll({
            where: { racetteId: id },
            include: [{
                model: DB.User, // Assurez-vous que 'modelUser' est correctement importé et configuré
                attributes: ['firstname'] // Récupérer uniquement le prénom
            }],
            order: [['createdAt', 'DESC']]

            // include: [{
            //     model: modelUser, // Assurez-vous que 'modelUser' est correctement importé et configuré
            //     attributes: { exclude: ['password', 'otherSensitiveField'] } // Excluez les champs sensibles
            // }],
        });
        res.json(tousComments);
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la récupération des commentaires', error });
    }
};

 
module.exports = {
    lesComentes, 
    getCommentaire
   
};