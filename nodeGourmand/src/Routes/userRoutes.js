const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { login, auth, deconnecteSession, getUser } = require('../Controllers/userController')
const { registerValidation } = require('../Validation/Validation');
const geolocalisation = require('../Models/geolocalisation')
 
// const { body, validationResult } = require('express-validator');
//  const validation=require('../Validation/validation')
// Définir le chemin du répertoire de destination pour le stockage des images
const storages = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/photoProfil');
    },
    filename: function (req, file, cb) {
        // Utiliser un horodatage pour éviter les conflits de noms de fichiers
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Configurer l'upload avec Multer
const uploads = multer({ storage: storages });

router.post('/login', login)
router.post('/register', uploads.single('photoProfil'),  registerValidation,auth  )
router.post('/logout', deconnecteSession)
router.get('/tousUser', getUser)

module.exports = router