const express=require('express');
const session = require('express-session');
const DB = require('../config/database');
const { where } = require('sequelize');

const postSuivre = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifie si l'utilisateur est connecté
        if (!req.session.userId) {
            return res.status(401).json({ status: false, message: "L'utilisateur n'est pas connecté" });
        }

        // Vérifie si l'utilisateur est déjà suivi
        const existingSuivi = await DB.suivre.findOne({
            where: {
                idUserSuiveur: req.session.userId,
                idUserSuivi: id
            }
        });

        if (!existingSuivi) {
            // Crée une nouvelle entrée de suivi
            const newSuivi = await DB.suivre.create({
                idUserSuiveur: req.session.userId,
                idUserSuivi: id
            });

            return res.status(201).json({ status: true, message: "Suivi ajouté avec succès", suivi: newSuivi });
        } else {
            return res.status(409).json({ status: false, message: "L'utilisateur est déjà suivi" });
        }

    } catch (error) {
        console.error('Erreur lors de la gestion du suivi :', error);
        return res.status(500).json({ status: false, message: "Une erreur est survenue" });
    }
};

// const getSuiveur = async(req, res)=>{
// try{

//         const lesSuiveur = await DB.suivre.findAll({where:{

//         }})


// }catch(error){
//     console.error('erreu lors de la recupération les utilisateurs suiveurs');
//     res.status(500).json({status:false, message:'erreur lors de la recupération des données'})
// }

// }

module.exports = {
    postSuivre
    
}