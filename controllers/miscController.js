const mongoose = require('mongoose');

// Récupérer tous les modèles définis dans Mongoose
exports.getAllModels = async (req, res) => {
  try {
    const modelNames = mongoose.modelNames();
    res.json({ models: modelNames });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer toutes les collections dans MongoDB
exports.getAllCollections = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((coll) => coll.name);
    res.json({ collections: collectionNames });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};