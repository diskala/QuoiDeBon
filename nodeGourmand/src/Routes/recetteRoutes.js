const express = require("express");
const router = express.Router();
const multer = require('multer');
const { recipe } = require("../Controllers/recetteController");
const path = require('path');

// Définir le chemin du répertoire de destination pour le stockage des images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/imagesStock/');
    },
    filename: function (req, file, cb) {
        // Utiliser le nom d'origine du fichier
        cb(null, file.originalname);
    }
});

// Configurer l'upload avec Multer
const upload = multer({ storage: storage });

// Route POST pour ajouter une recette avec une image
router.post("/addRecette", upload.single('image'), recipe);

module.exports = router;