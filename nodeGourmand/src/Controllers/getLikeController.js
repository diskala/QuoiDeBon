const express = require('express');
const session = require('express-session');
const DB = require('../config/database')
// const ModelLike = require('../Models/like');
// const ModelComment = require('../Models/comment');

const tousLike = async (req, res) => {
    try {
        // const { id } = req.params;
        // console.log('ID de la recette:', id);
        
        // Récupérer les likes pour la recette spécifique dont l'ID est fourni
        const tousLike = await DB.Like.findAll({ where: { etatLike: true } });
        res.json(tousLike)
        // res.json({nombreLikes : tousLike.length});

        // Compter toutes les vues
        // const tousVue = await ModelVue.findAll();
        // const countVue = tousVue.length;

        // // Compter tous les commentaires
        // const tousComment = await ModelComment.findAll();
        // const countComment = tousComment.length;

        // Retourner les résultats en JSON
        // res.json({likes: countLike})
        // res.json({ likes: countLike, vues: countVue, commentaires: countComment });
    } catch (error) {
        console.error('Erreur lors du comptage des vues, likes et commentaires:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

module.exports = tousLike;