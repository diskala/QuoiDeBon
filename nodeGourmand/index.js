
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { Sequelize } = require('sequelize');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const port = 5000;
app.set('trust proxy', 1); // nécessaire si derrière un proxy ou un load balancer
app.use(session({
  secret: 'V3jKGH7VPgu3MfPlWqJ+h/LkKOiq+QUtdDL+SUxvxZU=',
  resave: false,
  saveUninitialized: true,
  cookie: {
      secure: false, // mettre à true si vous utilisez HTTPS
      httpOnly: true,
      sameSite: 'lax' // ajustez selon vos besoins
  }
}));

app.use(express.json());




// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const connectDb = require('./src/config/database')

const register = require('./src/Models/register')
const userRoutes = require('./src/Routes/userRoutes')
const recetteRoutes = require("./src/Routes/recetteRoutes") // route pour charger les recettes dans la base de données
const tousRecettes = require('./src/Routes/tousRecettes') // route tous les recettes
const afficheApprox =require('./src/Routes/approxRoutes')
const routeTest = require('./src/Routes/teste')
const routeComments = require('./src/Routes/commentRoutes')
const routeCheck = require('./src/Routes/checkAuthRoute')
const routeLike=require('./src/Routes/routeLike')
const routeCountLike = require('./src/Routes/getLikeRoute')
const routeResComments = require('./src/Routes/resComRoute')
const routeTousComment = require('./src/Routes/tousCommentRoute')
const routeJaimeCommentaire = require('./src/Routes/jaimeComRoute')
const routeJaimeReponse = require('./src/Routes/jaimeReponseRoute')
const routeNotification = require('./src/Routes/notifRoute')
const routeMessagerie = require('./src/Routes/messagerieRoute')
const suiviRoute =require('./src/Routes/suivreRoute')
const routeContact = require('./src/Routes/contactRoute')
 
require('dotenv').config();
 
 

// app.use(cookieParser()); // Utilisez le middleware cookie-pars
// Middleware CORS
// app.use(cors({
//     origin: '*'
//   }));
app.use(cors({
  origin: 'http://localhost:3000', // Adresse de votre client React
  credentials: true // Ceci est important pour permettre les cookies
}));
 
 
// Utilisation du middleware body-parser pour analyser les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


  // Configuration de Multer pour le stockage des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/imagesStock/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Route pour gérer les téléchargements de fichiers avec Multer
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'Fichier téléchargé avec succès !' });
});
app.put('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'Fichier téléchargé avec succès !' });
});


// Configuration de Multer pour le stockage des photo
const storages = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/photoProfil/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const uploads = multer({ storages });

// Route pour gérer les téléchargements de fichiers avec Multer
app.post('/uploads', uploads.single('photoProfil'), (req, res) => {
  res.json({ message: 'Photo téléchargé avec succès !' });
});

 
  // Définir le dossier public pour servir les fichiers statiques
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(userRoutes);
  app.use(routeTest)
  app.use(routeLike)
  app.use(recetteRoutes);
  app.use( tousRecettes );
  app.use(afficheApprox);
  app.use(routeComments);
  app.use(routeCheck);
  app.use(routeCountLike);
  app.use(routeResComments);
  app.use(routeTousComment);
  app.use(routeJaimeCommentaire);
  app.use(routeJaimeReponse);
  app.use(routeNotification);
  app.use(routeMessagerie);
  app.use(suiviRoute);
  app.use(routeContact);
  
  
   
   
  

  app.listen(port, ()=>{
    console.log(`Le serveur est bien démarré sur le port:http://localhost:${port}`);
  })