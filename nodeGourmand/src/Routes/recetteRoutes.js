const express = require("express");
const router = express.Router();
const multer = require('multer');
const { recipe, updateRecipe, deleteRecipe  } = require("../Controllers/recetteController");
const path = require('path');

// Définir le chemin du répertoire de destination pour le stockage des images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/imagesStock/');
    },
    filename: function (req, file, cb) {
        // Utiliser un horodatage pour éviter les conflits de noms de fichiers
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Configurer l'upload avec Multer
const upload = multer({ storage: storage });

// Route POST pour ajouter une recette avec plusieurs fichiers
router.post("/addRecette", upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), recipe);

// Route PUT pour modifier une recette avec une image
router.put('/api/modifierRecette/:id',upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), updateRecipe);

// Route DELETE pour supprimer une recette
router.delete('/api/supprimerRecette/:id', deleteRecipe);

module.exports = router;