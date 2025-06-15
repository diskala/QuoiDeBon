const express = require('express')
const { Sequelize }= require('sequelize')
const { DataTypes } = require('sequelize')
 

module.exports = (sequelize)=>{
    const resComments = sequelize.define('repondre',{

        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        recette_id:{
            type: DataTypes.INTEGER,
            allowNull:false
            
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
             
        },
    
        comment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
        resComment:{
            type: DataTypes.TEXT,
            allowNull:true
        }
    
    });

    return resComments;
}

// resComments.belongsTo(User, { foreignKey: 'user_id' });
// User.hasMany(resComments, { foreignKey: 'user_id' });
// resComments.belongsTo(commentModel,{foreignKey:'comment_id'});
// commentModel.hasMany(resComments,{foreignKey: 'comment_id'});
 
// Fonction pour réessayer les opérations en cas de deadlock
// const retryOperation = async (operation, retries = 5) => {
//     for (let attempt = 0; attempt < retries; attempt++) {
//         try {
//             return await operation();
//         } catch (error) {
//             if (error.original?.code === 'ER_LOCK_DEADLOCK' && attempt < retries - 1) {
//                 console.warn(`Deadlock detected. Retrying attempt ${attempt + 1}/${retries}...`);
//                 await new Promise(res => setTimeout(res, 1000)); // Wait 1 second before retrying
//             } else {
//                 throw error;
//             }
//         }
//     }
// };

// (async () => {
//     try {
//         // Synchroniser les modèles individuellement
//         await retryOperation(() => User.sync({ alter: true }));
//         await retryOperation(() => resComments.sync({ alter: true }));
//         console.log("Le modèle pour commentaires est synchronisé avec la base de données");
//     } catch (error) {
//         console.error('Erreur lors de la synchronisation des modèles:', error);
//     }
// })();

 
 
