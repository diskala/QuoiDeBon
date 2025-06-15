const session = require('express-session');
const bcrypt = require('bcrypt');
const DB =require('../config/database') 
const { validationResult } = require('express-validator');
const { expression } = require('joi');
const { emit } = require('nodemon');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const login = async (req, res) => {
     
    try {
        const user = await DB.User.findOne({ where: { email: req.body.email} });
        if (!user) {
            return res.status(401).json({ success: false, message: "Identifiants ou le mot de passe incorrects" });
            console.log("Identifiants ou le mot de passe incorrects");
        }

        

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ success: false, message: "Identifiants ou le mot de passe incorrects" });
        }

        // const { latitude, longitude } = req.body;
        // if (!latitude || !longitude) {
        //     return res.status(400).json({ success: false, message: "Les coordonnées de latitude et longitude sont requises." });
        // }

        // await DB.geolocalisationModel.create({
        //     userId: user.id,
        //     latitude,
        //     longitude
        // });

         req.session.userId = user.id;
         console.log('ID soooooooooom de l\'utilisateur connecté:', req.session.userId);
         
        req.session.save(err => {
            if (err) {
                console.error('Erreur lors de la sauvegarde de la session:', err);
                return res.status(500).json({ success: false, message: "Une erreur est survenue lors de la sauvegarde de la session" });
            }
            console.log('Session sauvegardée:', req.session);
            return res.status(200).json({ success: true, message: "Connexion réussie", userId:req.session.id  });
        });
       
       
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ success: false, message: "Une erreur est survenue lors de la connexion" });
    }
};

 

const auth = async (req, res) => {
    try {
      // Validation des données
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        console.log("Erreurs de validation : ", errorMessages);
        return res.status(422).json({ errors: errorMessages });
      }
      const photoProfil = req.file ? `http://localhost:5000/photoProfil/${req.file.filename}` : '';
      const { email, firstname, lastname, password, address, phone, latitude, longitude } = req.body;

        if (!latitude || !longitude) {
            return res.status(400).json({ success: false, message: "Les coordonnées de latitude et longitude sont requises." });
        }
  
      // Vérification de l'existence de l'utilisateur
      const existingUser = await DB.User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "L'email est déjà utilisé." });
      }
  
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newAuth = new DB.User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        address,
        phone,
        photoProfil: photoProfil,
        latitude,
        longitude
      });
  
      await newAuth.save();

       await DB.geolocalisationModel.create({
        userId: newAuth.id,
        latitude,
        longitude
      });
       
  
      console.log("L'utilisateur est bien enregistré");
      return res.status(200).json({ success: true, message: "Utilisateur enregistré avec succès.", user: newAuth });
  
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'utilisateur:", error);
      return res.status(500).json({ success: false, error: "Erreur lors de l'enregistrement de l'utilisateur." });
    }
  };
const deconnecteSession = async (req,res) => {
   
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Erreur lors de la déconnexion" });
        }
        res.status(200).json({ success: true, message: "Déconnexion réussie" });
    });
};


const getUser = async(req, res)=>{
    
    try{
        const tousUser = await DB.User.findAll()

        return res.json(tousUser);
    }catch(error){
      console.error('l\'utilisateur n\'as pas pu etre récupérer', error );
      res.status(500).json({status:false, message:'Une erreurs est servenu'})
    }

}
module.exports = {
    login,
    auth,
    deconnecteSession,
    getUser
};