const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
require('dotenv').config();
const Stripe = require('stripe');
const cors = require("cors");
const http = require("http");

const { Server } = require("socket.io");

const app = express();
const { Sequelize } = require("sequelize");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const port = 5000;
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
app.use(
  cors({
    origin: "http://localhost:3000", // Adresse de votre client React
    credentials: true, // Ceci est important pour permettre les cookies
  })
);
app.use(
  session({
    secret: "V3jKGH7VPgu3MfPlWqJ+h/LkKOiq+QUtdDL+SUxvxZU=",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // mettre à true si vous utilisez HTTPS
      httpOnly: true,
      sameSite: "lax", // ajustez selon vos besoins
       maxAge: 1000 * 60 * 60 * 24, // 1 jour
    },
  })
);

app.set("trust proxy", 1); // nécessaire si derrière un proxy ou un load balancer


app.use(express.json());

// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const connectDb = require("./src/config/database");

const register = require("./src/Models/register");
const userRoutes = require("./src/Routes/userRoutes");
const recetteRoutes = require("./src/Routes/recetteRoutes"); // route pour charger les recettes dans la base de données
const tousRecettes = require("./src/Routes/tousRecettes"); // route tous les recettes
const afficheApprox = require("./src/Routes/approxRoutes");
const routeTest = require("./src/Routes/teste");
const routeComments = require("./src/Routes/commentRoutes");
const routeCheck = require("./src/Routes/checkAuthRoute");
const routeLike = require("./src/Routes/routeLike");
const routeCountLike = require("./src/Routes/getLikeRoute");
const routeResComments = require("./src/Routes/resComRoute");
const routeTousComment = require("./src/Routes/tousCommentRoute");
const routeJaimeCommentaire = require("./src/Routes/jaimeComRoute");
const routeJaimeReponse = require("./src/Routes/jaimeReponseRoute");
const routeNotification = require("./src/Routes/notifRoute");
const routeMessagerie = require("./src/Routes/messagerieRoute");
const suiviRoute = require("./src/Routes/suivreRoute");
const routeContact = require("./src/Routes/contactRoute");
const paymentStripe = require('./src/Routes/paymentStrape');

require("dotenv").config();

// app.use(cookieParser()); // Utilisez le middleware cookie-pars
// Middleware CORS
// app.use(cors({
//     origin: '*'
//   }));

// Middleware pour analyser les données JSON

// Utilisation du middleware body-parser pour analyser les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuration de Multer pour le stockage des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imagesStock/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Route pour gérer les téléchargements de fichiers avec Multer
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ message: "Fichier téléchargé avec succès !" });
});
app.put("/upload", upload.single("file"), (req, res) => {
  res.json({ message: "Fichier téléchargé avec succès !" });
});

// Configuration de Multer pour le stockage des photo
const storages = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/photoProfil/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploads = multer({ storages });

// Route pour gérer les téléchargements de fichiers avec Multer
app.post("/uploads", uploads.single("photoProfil"), (req, res) => {
  res.json({ message: "Photo téléchargé avec succès !" });
});
const server = http.createServer(app);
// Configuration de socket.io
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Middleware pour injecter io dans chaque requête
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Définir le dossier public pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));
app.use(userRoutes);
app.use(routeTest);
app.use(routeLike);
app.use(recetteRoutes);
app.use(tousRecettes);
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
app.use(paymentStripe);

// Logique des sockets
io.on("connection", (socket) => {
  console.log(`Utilisateur connecté: ${socket.id}`);

  socket.on("send_message", (data) => {
    io.emit("send_message", data); // broadcast à tous
    console.log(`Message envoyé: ${data}`);
  });
  // socket.on('send_comment', (commenteData) => {
  //   io.emit('send_comment', commenteData); // broadcast à tous
  //   console.log(`commentaire envoyé: ${commenteData}`);
  //   socket.on('newComment', (dataComment) => {
  //     io.emit('receiveComment', dataComment);
  //   // broadcast à tous sauf l'émetteur
  //   socket.broadcast.emit('receiveComment', dataComment);

  // });

  socket.on("disconnect", () => {
    console.log(`Utilisateur déconnecté: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Serveur Socket.io sur http://localhost:${port}`);
});

// app.listen(port, ()=>{
//   console.log(`Le serveur est bien démarré sur le port:http://localhost:${port}`);
// })
