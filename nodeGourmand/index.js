const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
const session = require('express-session');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const connectDb = require('./src/config/database')
const register = require('./src/Models/register')
const userRoutes = require('./src/Routes/userRoutes')
const recetteRoutes = require("./src/Routes/recetteRoutes")
 
 
const port = 5000;

// Middleware CORS
app.use(cors({
    origin: '*'
  }));

  // Utilisez express-session middleware
app.use(session({
  secret: '1974', // Clé secrète utilisée pour signer les cookies de session
  resave: false, // Ne sauvegarde pas la session si elle n'a pas été modifiée
  saveUninitialized: false // Ne crée pas de session pour les requêtes qui n'ont pas de session
}));
  
  // Utilisation du middleware body-parser pour analyser les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
  app.use(userRoutes);

  // Configuration de Multer pour le stockage des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/imagesStock/'); // Le dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Nom du fichier téléchargé
  }
});

// Initialiser Multer avec la configuration de stockage
const upload = multer({ storage });

// Middleware pour gérer les téléchargements de fichiers avec Multer
app.post('/upload', upload.single('file'), (req, res) => {
  // Traiter la demande de téléchargement de fichier ici
  res.json({ message: 'Fichier téléchargé avec succès !' });
});
  // Définir le dossier public pour servir les fichiers statiques
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(recetteRoutes);
  

  app.listen(port, ()=>{
    console.log(`Le serveur est bien démarré sur le port:http://localhost:${port}`);
  })