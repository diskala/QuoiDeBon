const bcrypt = require('bcrypt')
const registerModel = require('../Models/register'); // Renommer l'importation pour éviter la confusion avec le nom de la fonction
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { registerValidation } = require('../Validation/Validation');
const  geolocalisation  = require('../Models/geolocalisation');
 
require('dotenv').config();

const login = async (req, res) => {
    try {
        // Vérifier les informations de connexion
        const user = await registerModel.findOne({ where: { email: req.body.email } });
        if (!user) {
            // Utilisateur non trouvé
            return res.status(401).json({ success: false, message: "Identifiants ou le mot de passe incorrects" });
        }

        // Vérifier le mot de passe
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            // Mot de passe incorrect
            return res.status(401).json({ success: false, message: "Identifiants ou le mot de passe incorrects" });
        }

        // Générer un jeton d'authentification
        // const token = jwt.sign({ userId: user.id }, 'V3jKGH7VPgu3MfPlWqJ+h/LkKOiq+QUtdDL+SUxvxZU='); // Remplacez 'votre_clé_secrète' par votre clé secrète réelle

        // Enregistrement de la géolocalisation de l'utilisateur
        const { latitude, longitude } = req.body;
        const newLocalisation = await geolocalisation.create({
            userId: user.id,
            latitude,
            longitude
        });

        console.log('Authentification réussie');
        // Authentification réussie
        return res.status(200).json({ success: true, message: "Connexion réussie", user });
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
           
            // const errorMessages= "Le mot de passe doit y avoir 8 carèctéres maximmum, au moins une lettre en majuscule, un chiffre et un carèctére spéciaux"
             console.log("Erreurs de validation : ", errorMessages);
             return res.status(422).json({ errors: errorMessages });
         }
   else{
    const saltRounds = 10;
    const newAuth = new registerModel();
    newAuth.firstname = req.body.firstname;
    newAuth.lastname = req.body.lastname;
    newAuth.email = req.body.email;

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    newAuth.password = hashedPassword;
    newAuth.address = req.body.address;
    newAuth.phone = req.body.phone;

    await newAuth.save();

    // return res.status(200).json({ success: true, message: "Utilisateur enregistré avec succès.", user: newAuth });
    console.log("l'utilisateur est bien enregistrer");
} 
   }
   catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
    return res.status(500).json({ success: false, error: 'Erreur lors de l\'enregistrement de l\'utilisateur.' });
}
       
};

module.exports = {
    login,
    auth
};