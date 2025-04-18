const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DB_URI;

async function connectToDatabase() {
  try {
    if (!uri) {
      throw new Error(" DB_URI est manquant dans le fichier .env !");
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(" Connexion à MongoDB avec Mongoose réussie !");
  } catch (err) {
    console.error(" Erreur de connexion à MongoDB :", err.message);
    process.exit(1); // Quitte le processus si la connexion échoue
  }
}

module.exports = connectToDatabase;
