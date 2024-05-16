const { Sequelize } = require('sequelize');

// Configuration de la connexion à la base de données
const sequelize = new Sequelize('quoidebon', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // Utilisation du dialecte MySQL
  port: 3306, // Port par défaut de MySQL
});

// Vérification de la connexion à la base de données
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');
  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données:', error);
  }
}

testDatabaseConnection();

module.exports = sequelize;