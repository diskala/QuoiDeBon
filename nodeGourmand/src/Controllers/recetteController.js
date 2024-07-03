const session = require('express-session');
const DB = require("../config/database");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
 

const recipe = async (req, res) => {

   

    try {

        
        
        
       // Vérifiez que l'utilisateur est authentifié
       const emaile = req.body.email
        if (!req.body.email) {
            return res.status(401).json({ success: false, message: 'email n\'est pas saisi ' });
        } 
        
        console.log(emaile);
       // Récupérer les URLs des fichiers téléchargés
       const imageUrl_1 = req.files.image1 ? `http://localhost:5000/imagesStock/${req.files.image1[0].filename}` : '';
       const imageUrl_2 = req.files.image2 ? `http://localhost:5000/imagesStock/${req.files.image2[0].filename}` : '';
       const imageUrl_3 = req.files.image3 ? `http://localhost:5000/imagesStock/${req.files.image3[0].filename}` : '';
       const videoUrl = req.files.video ? `http://localhost:5000/imagesStock/${req.files.video[0].filename}` : '';
        const { email, name, halal, sweet, salty, description,latitude, longitude } = req.body;
      
        const user = await DB.User.findAll();
        const result = user.filter((recup)=>recup.email === emaile)
        console.log(result);
        const userId = result.map(ide => ide.id);
        console.log(userId);
         
            const newRecette = await DB.recette.create({
                userId:userId, // Assurez-vous de fournir userId lors de la création de la recette
                email,
                name,
                imageURL_1: imageUrl_1,
                imageURL_2: imageUrl_2,
                imageURL_3: imageUrl_3,
                halal,
                sweet,
                salty,
                description,
                videoURL:videoUrl,
                latitude,
                longitude
            });

            const fullRecettes = await DB.recette.findOne({
                where: { id: newRecette.id },
                include: [{
                    model: DB.User,
                    attributes: ['firstname']
                   
                }]
            });
    
            return res.status(201).json(fullRecettes);
    
             
       
         
        
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la recette:', error);
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement de la recette.' });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;

        // Vérifiez que l'utilisateur est authentifié
        if (!req.body.email) {
            return res.status(401).json({ success: false, message: 'email n\'est pas saisi' });
        }

        const { email, name, halal, sweet, salty, description, latitude, longitude } = req.body;
        // Récupérer les URLs des fichiers téléchargés
        const imageUrl_1 = req.files.image1 ? `http://localhost:5000/imagesStock/${req.files.image1[0].filename}` : '';
        const imageUrl_2 = req.files.image2 ? `http://localhost:5000/imagesStock/${req.files.image2[0].filename}` : '';
        const imageUrl_3 = req.files.image3 ? `http://localhost:5000/imagesStock/${req.files.image3[0].filename}` : '';
        const videoUrl = req.files.video ? `http://localhost:5000/imagesStock/${req.files.video[0].filename}` : '';

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

        // Si une nouvelle image est téléchargée, supprimez l'ancienne image
        // if (req.file && recette.imageURL) {
        //     const oldImagePath = path.join(__dirname, '..', 'public', 'imagesStock', path.basename(recette.imageURL));
        //     fs.unlink(oldImagePath, (err) => {
        //         if (err) {
        //             console.log('Erreur lors de la suppression de l\'ancienne image :', err);
        //         }
        //     });
        // }

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
            videoURL:videoUrl,
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
        // if (!req.body.email) {
        //     return res.status(401).json({ success: false, message: 'email n\'est pas saisi' });
        // }

        // Récupérez l'utilisateur
        // const user = await DB.User.findOne({ where: { email: req.body.email } });
        // if (!user) {
        //     return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        // }

        // Récupérez la recette
        const recette = await DB.recette.findOne({ where: { id: recipeId, userId: req.session.userId } });
        if (!recette) {
            return res.status(404).json({ success: false, message: 'Recette non trouvée ou non autorisée' });
        }

        // Supprimez la recette
        await recette.destroy();

        return res.status(200).json({ success: true, message: 'Recette supprimée avec succès' });

    } catch (error) {
        console.error('Erreur lors de la suppression de la recette:', error);
        res.status(500).json({ error: 'Erreur lors de la suppression de la recette.' });
    }
};



module.exports = {
    recipe,
    updateRecipe,
    deleteRecipe
};