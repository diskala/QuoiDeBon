const session = require('express-session');
const DB = require('../config/database')


const updateRecipe = async (req, res) => {
    const recipeId = req.params.id;
   


    try {
        // Vérifiez que l'utilisateur est authentifié
        if (!req.body.email) {
            return res.status(401).json({ success: false, message: 'email n\'est pas saisi' });
        }

        // Récupérez l'utilisateur
        const user = await DB.User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }
        const { email, name, halal, sweet, salty, description, latitude, longitude } = req.body;
        // Récupérer les URLs des fichiers téléchargés
        const imageUrl_1 = req.files.image1 ? `http://localhost:5000/imagesStock/${req.files.image1[0].filename}` : '';
        const imageUrl_2 = req.files.image2 ? `http://localhost:5000/imagesStock/${req.files.image2[0].filename}` : '';
        const imageUrl_3 = req.files.image3 ? `http://localhost:5000/imagesStock/${req.files.image3[0].filename}` : '';
        const videoUrl = req.files.video ? `http://localhost:5000/imagesStock/${req.files.video[0].filename}` : '';

        // Récupérez la recette
        const recette = await DB.recette.findOne({ where: { id: recipeId, userId: user.id } });
        if (!recette) {
            return res.status(404).json({ success: false, message: 'Recette non trouvée ou non autorisée' });
        }

        // Mettez à jour la recette
        const updatedRecette = await recette.update({
            email,
            name,
            imageURL_1: imageUrl_1,
            imageURL_2: imageUrl_2,
            imageURL_3: imageUrl_3,
            halal,
            sweet,
            salty,
            description,
            latitude,
            longitude
        });

        return res.status(200).json(updatedRecette);

    } catch (error) {
        console.error('Erreur lors de la mise à jour de la recette:', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la recette.' });
    }
};




/// pour supprimer la recette

const deleteRecipe = async (req, res) => {
    const recipeId = req.params.id;

    try {
        // Vérifiez que l'utilisateur est authentifié
        if (!req.body.email) {
            return res.status(401).json({ success: false, message: 'email n\'est pas saisi' });
        }

        // Récupérez l'utilisateur
        const user = await DB.User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }

        // Récupérez la recette
        const recette = await DB.recette.findOne({ where: { id: recipeId, userId: user.id } });
        if (!recette) {
            return res.status(404).json({ success: false, message: 'Recette non trouvée ou non autorisée' });
        }

        // Supprimez la recette
        await recette.destroy();

        return res.status(200).json({ success: true, message: 'Recette supprimée avec succès', recette });

    } catch (error) {
        console.error('Erreur lors de la suppression de la recette:', error);
        res.status(500).json({ error: 'Erreur lors de la suppression de la recette.' });
    }
};
//Modifier le fichier routes.js pour inclure les nouvelles routes
//Ajoutez les nouvelles routes dans votre fichier de routes :
//javascript
//Copier le code
const express = require('express');
const router = express.Router();
const { recipe, updateRecipe, deleteRecipe } = require('./controllers/recipeController');

router.post('/api/ajoutRecette', recipe);
router.put('/api/modifierRecette/:id', updateRecipe);
router.delete('/api/supprimerRecette/:id', deleteRecipe);

module.exports = router;