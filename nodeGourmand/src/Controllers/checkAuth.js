const express=require('express')
const session = require('express-session')
const DB = require('../config/database');
const { where } = require('sequelize');

const checkAuth = async(req,res)=>{
  
  if (req.session.userId) {
    // res.json({ isAuthenticated: true, user: req.session.userId });
    try {
            console.log('User ID in session:', req.session.userId); // Log l'ID utilisateur
            const user = await DB.User.findByPk(req.session.userId);
            if (user) {
              console.log('User found:', user); // Log l'utilisateur trouvé
              res.json({ isAuthenticated: true, email: user.email, id:user.id, firstname: user.firstname,
                 lastname: user.lastname, phone: user.phone, image: user.photoProfil, address: user.address });
            } else {
              console.log('User not found'); // Log si l'utilisateur n'est pas trouvé
              res.status(404).json({ isAuthenticated: false, message: 'User not found' });
            }
          } catch (error) {
            console.error('Error during user retrieval:', error); // Log l'erreur
            res.status(500).json({ isAuthenticated: false, message: 'Internal Server Error' });
          }
        } else {
          console.log('No user ID in session'); // Log si l'ID utilisateur est manquant
          res.json({ isAuthenticated: false });
        }
  }  



// pour envoyer tous les donnees du user authetifier

// const tousDonneesUser = async (req, res) => {
//   if (req.session.userId) {
//     try {
//       console.log('User ID in session:', req.session.userId); // Log l'ID utilisateur
//       const user = await DB.User.findByPk(req.session.userId);
//       if (user) {
//         console.log('User found:', user); // Log l'utilisateur trouvé
//         res.json({ isAuthenticated: true, email: user.email });
//       } else {
//         console.log('User not found'); // Log si l'utilisateur n'est pas trouvé
//         res.status(404).json({ isAuthenticated: false, message: 'User not found' });
//       }
//     } catch (error) {
//       console.error('Error during user retrieval:', error); // Log l'erreur
//       res.status(500).json({ isAuthenticated: false, message: 'Internal Server Error' });
//     }
//   } else {
//     console.log('No user ID in session'); // Log si l'ID utilisateur est manquant
//     res.json({ isAuthenticated: false });
//   }
// };

 
module.exports= checkAuth