const sequelize = require("../config/database");
const RecetteModel = require("../Models/reccette");
const modelRegister = require('../Models/register')
const session = require('express-session');
// const multer = require('multer');
 

const recipe = async (req, res) => {
    try {
    
        // Obtenir l'ID de l'utilisateur à partir de la session
        const userId = req.session.id;

        // Vérifier si userId est défini
        if (!userId) {
            // return res.status(401).json({ success: false, message: "Utilisateur non authentifié" });
            console.log('Utilisateur non authentifié');
        }
        const imageUrl = req.file ? `http://localhost:5000/imagesStock/${req.file.filename}` : '';
        const { userName, name, Halal, sweet, salty, description } = req.body;
       
  

        const newRecette = await RecetteModel.create({
            userId, // Assurez-vous de fournir userId lors de la création de la recette
            userName,
            name,
            imageURL:imageUrl,
            Halal,
            sweet,
            salty,
            description
        });

        console.log('La recette est enregistrée avec succès.');
        res.status(201).json(newRecette);
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la recette:', error);
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement de la recette.' });
    }
};
module.exports = {
    recipe
};