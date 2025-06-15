const express = require('express');
const session = require('express-session');
const DB = require('../config/database');

const postSuivre = async (req, res) => {
 
  try {
     const idRecipe = req.params.idRecipe;

if (!req.session.userId) {
  return res.status(401).json({ status: false, message: "Utilisateur suiveur non authentifié." });
}

if (!idRecipe) {
  return res.status(400).json({ status: false, message: "Identifiant de la recette manquant ou invalide." });
}

// Vérifier si le suivi existe déjà
const existingSuivi = await DB.suivre.findOne({
  where: {
    idUserSuiveur: req.session.userId,
    idRecipe,
  },
});

if (existingSuivi) {
  return res.status(409).json({ status: false, message: "L'utilisateur est déjà suivi pour cette recette." });
}

// Créer le suivi
const newSuivi = await DB.suivre.create({
  idUserSuiveur: req.session.userId,
  idRecipe,
});

return res.status(201).json({ status: true, message: "Suivi ajouté avec succès", suivi: newSuivi });

  } catch (error) {
    console.error('Erreur complète côté serveur :', error);
    return res.status(500).json({
      status: false,
      message: "Erreur serveur lors de l'ajout du suivi.",
      error: error.message
    });
  }
};

module.exports = {
  postSuivre
};
