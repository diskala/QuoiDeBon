const express = require('express');
const session = require('express-session');
const DB = require('../config/database');
const jwt = require('jsonwebtoken');
const geolib = require('geolib');

const getApproxRecette = async (req, res) => {
  try {
    if (req.session.userId) {
      const userId = req.session.userId;
      const userConnecte = await DB.User.findOne({
        where: { id: userId },
        order: [['createdAt', 'DESC']]
      });

      if (!userConnecte) {
        return res.status(401).json({ success: false, message: "Utilisateur non identifié" });
      }

      const userLatitude = userConnecte.latitude;
      const userLongitude = userConnecte.longitude;

      if (!userLatitude || !userLongitude) {
        return res.status(400).json({ success: false, message: "Coordonnées GPS manquantes" });
      }

      // Récupère toutes les recettes (avec l'utilisateur associé)
      const recettes = await DB.recette.findAll({
        include: [{ model: DB.User }],
        order: [['createdAt', 'DESC']]
      });

      // Filtrage des recettes proches
      const nearbyRecipes = await Promise.all(
        recettes.map(async (recipe) => {
          const distance = geolib.getDistance(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: recipe.latitude, longitude: recipe.longitude }
          );

          if (distance <= 5000) {
            const likeCount = await DB.Like.count({
              where: {
                recette_id: recipe.id,
                etatLike: true
              }
            });

            return {
              ...recipe.toJSON(),
              likes: likeCount
            };
          }
        })
      );

      // Supprime les recettes "undefined"
      const filteredNearbyRecipes = nearbyRecipes.filter(r => r !== undefined);

      // ✅ PAGINATION
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 3;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const paginatedRecipes = filteredNearbyRecipes.slice(startIndex, endIndex);

      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(filteredNearbyRecipes.length / limit),
        totalItems: filteredNearbyRecipes.length,
        data: paginatedRecipes
      });
    } else {
      res.status(401).json({ success: false, message: "Vous êtes déconnecté" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

 

// const getApproxRecette = async (req,res) => {
   
//     try {
      
//         console.log('Session courante:', req.session + req.session.userId);
//         if (req.session.userId) {
            
//             const userId = req.session.userId;
//             const userConnecte = await DB.User.findOne({
//                 where: { id:req.session.userId },
//                 order: [['createdAt', 'DESC']]
//             });

          
            
//             if (!userConnecte) {
//                 return res.status(401).json({ success: false, message: "utilisateur n'est pas identifiée" });
//             }

//             const userLatitude = userConnecte.latitude;
//             const userLongitude = userConnecte.longitude;
//              if (!userLatitude || !userLongitude) {
//                 return res.status(400).json({ success: false, message: "Les coordonnées de latitude et longitude sont requises." });
                
//             }

//             // Récupérer toutes les recettes
//             const recettes = await DB.recette.findAll(
//                { include: [{
//                     model: DB.User,
                    
//                 }],
//                   order: [['createdAt', 'DESC']]
//             }
//             );

//             // Calculer les distances et filtrer les recettes proches
//             const nearbyRecipes = await Promise.all(recettes.map(async (recipe) => {
//                 const recipeDistance = geolib.getDistance(
//                     { latitude: userLatitude, longitude: userLongitude },
//                     { latitude: recipe.latitude, longitude: recipe.longitude }
//                 );

//                 if (recipeDistance <= 5000) { // Distance en mètres
//                     // Compter les likes pour chaque recette
//                     const likeCount = await DB.Like.count({
//                         where: {
//                             recette_id: recipe.id,
//                             etatLike: true
//                         }
//                     });

                   

                    

//                     return {
//                         ...recipe.toJSON(),
//                         likes: likeCount,
                        
//                     };
//                 }
//             }));

//             // Filtrer les recettes undefined
//             const filteredNearbyRecipes = nearbyRecipes.filter(recipe => recipe !== undefined);

//             res.status(200).json(filteredNearbyRecipes );
//         } else {
//             res.status(401).json({ success: false, message: 'Vous êtes déconnecté' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Erreur interne du serveur' });
//     }
    
// };

module.exports = { getApproxRecette };