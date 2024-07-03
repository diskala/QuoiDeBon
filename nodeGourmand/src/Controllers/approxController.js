const express = require('express');
const session = require('express-session');
const DB = require('../config/database');
const jwt = require('jsonwebtoken');
const geolib = require('geolib');
 

const getApproxRecette = async (req,res) => {
   
    try {
      
        console.log('Session courante:', req.session + req.session.userId);
        if (req.session.userId) {
            
            const userId = req.session.userId;
            const lastGeolocalisation = await DB.geolocalisationModel.findOne({
                where: { userId:req.session.userId },
                order: [['createdAt', 'DESC']]
            });
            
            if (!lastGeolocalisation) {
                return res.status(401).json({ success: false, message: "Géolocalisation n'est pas identifiée" });
            }

            const userLatitude = lastGeolocalisation.latitude;
            const userLongitude = lastGeolocalisation.longitude;

            // Récupérer toutes les recettes
            const recettes = await DB.recette.findAll(
               { include: [{
                    model: DB.User,
                    
                }]}
            );

            // Calculer les distances et filtrer les recettes proches
            const nearbyRecipes = await Promise.all(recettes.map(async (recipe) => {
                const recipeDistance = geolib.getDistance(
                    { latitude: userLatitude, longitude: userLongitude },
                    { latitude: recipe.latitude, longitude: recipe.longitude }
                );

                if (recipeDistance <= 5000) { // Distance en mètres
                    // Compter les likes pour chaque recette
                    const likeCount = await DB.Like.count({
                        where: {
                            recette_id: recipe.id,
                            etatLike: true
                        }
                    });

                    

                    return {
                        ...recipe.toJSON(),
                        likes: likeCount,
                        
                    };
                }
            }));

            // Filtrer les recettes undefined
            const filteredNearbyRecipes = nearbyRecipes.filter(recipe => recipe !== undefined);

            res.status(200).json( recettes);
        } else {
            res.status(401).json({ success: false, message: 'Vous êtes déconnecté' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
    
};

module.exports = { getApproxRecette };