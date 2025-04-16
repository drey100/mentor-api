const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Connexion à la base de données réussie.');
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error.message);
    process.exit(1); // Quitte l'application en cas d'erreur
  }
};

module.exports = connectDB; 