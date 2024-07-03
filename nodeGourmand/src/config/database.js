const { Sequelize } = require('sequelize');

// Configuration de la connexion à la base de données
const sequelize = new Sequelize('gourmands', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  retry: {
    match: [/Deadlock/i],
    max: 5, // Nombre maximum de tentatives
  },
});

const db = {};
db.sequelize=sequelize;
db.User = require('../Models/register')(sequelize);
db.reponseModel = require('../Models/reponseModel')(sequelize);
db.geolocalisationModel = require('../Models/geolocalisation')(sequelize);
db.recette= require('../Models/reccette')(sequelize);
db.Like = require('../Models/like')(sequelize);
db.comment = require('../Models/comment')(sequelize);
db.jaimeComment =require('../Models/jaimeComment')(sequelize);
db.jaimeReponse = require('../Models/jaimeReponse')(sequelize);
db.notifModel =require('../Models/notifModel')(sequelize);
db.notifReponse=require('../Models/notifReponse')(sequelize);
db.messagerie = require('../Models/messagerie')(sequelize);
db.suivre = require('../Models/suivre')(sequelize);
db.contact = require('../Models/contact')(sequelize);

// relations utilisateurs et table commentaires
 db.User.hasMany(db.comment, {foreignKey:'userId'});
 db.comment.belongsTo(db.User, {foreignKey: 'userId'});

 // relations recette et table commentaires
 db.recette.hasMany(db.comment, {foreignKey:'racetteId'});
 db.comment.belongsTo(db.recette, {foreignKey: 'racetteId'});

// relations utilisateurs et table de reponse sur les commentaires
db.User.hasMany(db.reponseModel, { foreignKey: 'user_id' });
db.reponseModel.belongsTo(db.User, { foreignKey: 'user_id' })

db.comment.hasMany(db.reponseModel,{foreignKey: 'comment_id'});
db.reponseModel.belongsTo(db.comment,{foreignKey: 'comment_id'})

db.User.hasMany(db.recette, { foreignKey: 'userId' });
db.recette.belongsTo(db.User, { foreignKey: 'userId' });

 
 

// Relations entre les commentaires et les notifications
db.comment.hasMany(db.notifModel, { foreignKey: 'commentId' });
db.notifModel.belongsTo(db.comment, { foreignKey: 'commentId' });

// Relations entre les recettes et les notifications
db.recette.hasMany(db.notifModel, { foreignKey: 'recetteId' });
db.notifModel.belongsTo(db.recette, { foreignKey: 'recetteId' });

// Relations entre les utilisateurs et les notifications
db.User.hasMany(db.notifModel, { foreignKey: 'userId' });
db.notifModel.belongsTo(db.User, { foreignKey: 'userId' });

// Relations entre les commentaires et les notifications
db.comment.hasMany(db.notifReponse, { foreignKey: 'commentId' });
db.notifReponse.belongsTo(db.comment, { foreignKey: 'commentId' });

// Relations entre les reponse commentaires et les notifications
db.reponseModel.hasMany(db.notifReponse, { foreignKey: 'reponseId' });
db.notifReponse.belongsTo(db.reponseModel, { foreignKey: 'reponseId' });


// Relations entre les recettes et les notifications
db.recette.hasMany(db.notifReponse, { foreignKey: 'recetteId' });
db.notifReponse.belongsTo(db.recette, { foreignKey: 'recetteId' });

// Relations entre les utilisateurs et les notifications
db.User.hasMany(db.notifReponse, { foreignKey: 'userId' });
db.notifReponse.belongsTo(db.User, { foreignKey: 'userId' });

 
  db.User.hasMany(db.messagerie, { foreignKey: 'idUserEnvois', as: 'sentMessages' });
  db.User.hasMany(db.messagerie, { foreignKey: 'idUserRecois', as: 'receivedMessages' });


 
  db.messagerie.belongsTo(db.User, { foreignKey: 'idUserEnvois', as: 'userEnvois' });
  db.messagerie.belongsTo(db.User, { foreignKey: 'idUserRecois', as: 'userRecois' });

// db.User.hasMany(db.messagerie,{foreignKey: 'idUserEnvois'});
// db.messagerie.belongsTo(db.User,{foreignKey:'idUserEnvois'});

// db.User.hasMany(db.messagerie,{foreignKey: 'idUserRecois'});
// db.messagerie.belongsTo(db.User,{foreignKey:'idUserRecois'});


db.User.hasMany(db.suivre,{foreignKey: 'idUserSuiveur'});
db.suivre.belongsTo(db.User,{foreignKey:'idUserSuiveur'});



// Vérification de la connexion à la base de données
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');

    // Synchronisation des modèles avec la base de données
    await sequelize.sync({ alter: true }); // Utilisez { force: true } pour recréer les tables
    console.log('La synchronisation des modèles est terminée.');
  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données:', error);
  }
}

testDatabaseConnection();


module.exports = db;