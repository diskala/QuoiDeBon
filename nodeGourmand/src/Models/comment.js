const { Sequelize, DataTypes } = require('sequelize');
 
 

module.exports=(sequelize)=>{
    const Commente = sequelize.define('commentaire', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        racetteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
        
    });
    return Commente;
}



// Définir les relations
// Commente.belongsTo(User, { foreignKey: 'userId' });
// User.hasMany(Commente, { foreignKey: 'userId' });
// (async()=>{
//     await sequelize.sync({ alter: true });
//     console.log("Le modèle Commentaire est synchronisé avec la base de données");
// })();
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
//         await retryOperation(() => Commente.sync({ alter: true }));
//         console.log("Le modèle pour commentaires est synchronisé avec la base de données");
//     } catch (error) {
//         console.error('Erreur lors de la synchronisation des modèles:', error);
//     }
// })();

 