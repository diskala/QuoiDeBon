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
 db.User.hasMany(db.comment, {foreignKey:'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
 db.comment.belongsTo(db.User, {foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE'});

 // relations recette et table commentaires
 db.recette.hasMany(db.comment, {foreignKey:'racetteId', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
 db.comment.belongsTo(db.recette, {foreignKey: 'racetteId', onDelete: 'CASCADE', onUpdate: 'CASCADE'});

// relations utilisateurs et table de reponse sur les commentaires
db.User.hasMany(db.reponseModel, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.reponseModel.belongsTo(db.User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

db.comment.hasMany(db.reponseModel,{foreignKey: 'comment_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
db.reponseModel.belongsTo(db.comment,{foreignKey: 'comment_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'})

db.User.hasMany(db.recette, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.recette.belongsTo(db.User, { foreignKey: 'userId' , onDelete: 'CASCADE', onUpdate: 'CASCADE'});

 
 

// Relations entre les commentaires et les notifications
db.comment.hasMany(db.notifModel, { foreignKey: 'commentId' , onDelete: 'CASCADE', onUpdate: 'CASCADE'});
db.notifModel.belongsTo(db.comment, { foreignKey: 'commentId' , onDelete: 'CASCADE', onUpdate: 'CASCADE'});

// Relations entre les recettes et les notifications
db.recette.hasMany(db.notifModel, { foreignKey: 'recetteId' , onDelete: 'CASCADE', onUpdate: 'CASCADE'});
db.notifModel.belongsTo(db.recette, { foreignKey: 'recetteId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Relations entre les utilisateurs et les notifications
db.User.hasMany(db.notifModel, { foreignKey: 'userId' , onDelete: 'CASCADE', onUpdate: 'CASCADE'});
db.notifModel.belongsTo(db.User, { foreignKey: 'userId' , onDelete: 'CASCADE', onUpdate: 'CASCADE'});

// Relations entre les commentaires et les notifications
db.comment.hasMany(db.notifReponse, { foreignKey: 'commentId' , onDelete: 'CASCADE', onUpdate: 'CASCADE'});
db.notifReponse.belongsTo(db.comment, { foreignKey: 'commentId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Relations entre les reponse commentaires et les notifications
db.reponseModel.hasMany(db.notifReponse, { foreignKey: 'reponseId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.notifReponse.belongsTo(db.reponseModel, { foreignKey: 'reponseId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


// Relations entre les recettes et les notifications
db.recette.hasMany(db.notifReponse, { foreignKey: 'recetteId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.notifReponse.belongsTo(db.recette, { foreignKey: 'recetteId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Relations entre les utilisateurs et les notifications
db.User.hasMany(db.notifReponse, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.notifReponse.belongsTo(db.User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

 
  db.User.hasMany(db.messagerie, { foreignKey: 'idUserEnvois', as: 'sentMessages', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  db.User.hasMany(db.messagerie, { foreignKey: 'idUserRecois', as: 'receivedMessages' , onDelete: 'CASCADE', onUpdate: 'CASCADE'});


 
  db.messagerie.belongsTo(db.User, { foreignKey: 'idUserEnvois', as: 'userEnvois', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  db.messagerie.belongsTo(db.User, { foreignKey: 'idUserRecois', as: 'userRecois', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

  db.User.hasMany(db.suivre,{ foreignKey: 'idUserSuiveur', as: 'suiveur' , onDelete: 'CASCADE', onUpdate: 'CASCADE'});
  // db.User.hasMany(db.suivre,{ foreignKey: 'idUserSuivi', as: 'suivi' });

  db.suivre.belongsTo(db.User, { foreignKey: 'idUserSuiveur', as: 'suiveur' , onDelete: 'CASCADE', onUpdate: 'CASCADE'});
  // db.suivre.belongsTo(db.User, { foreignKey: 'idUserSuivi', as: 'suivi' });

  db.recette.hasMany(db.suivre, { foreignKey: 'idRecipe' , onDelete: 'CASCADE', onUpdate: 'CASCADE'});
  db.suivre.belongsTo(db.recette, { foreignKey: 'idRecipe' , onDelete: 'CASCADE', onUpdate: 'CASCADE'});

// db.User.hasMany(db.contact,{foreignKey: 'idUserEnvois'});
// db.messagerie.belongsTo(db.User,{foreignKey:'idUserEnvois'});

// db.User.hasMany(db.messagerie,{foreignKey: 'idUserRecois'});
// db.messagerie.belongsTo(db.User,{foreignKey:'idUserRecois'});


// db.User.hasMany(db.suivre,{foreignKey: 'idUserSuiveur'});
// db.suivre.belongsTo(db.User,{foreignKey:'idUserSuiveur'});

 




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