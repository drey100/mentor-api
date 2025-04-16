const express = require('express');
const miscController = require('../controllers/miscController');
const router = express.Router();

// Récupérer tous les modèles
router.get('/models', miscController.getAllModels);

// Récupérer toutes les collections
router.get('/collections', miscController.getAllCollections);

module.exports = router;