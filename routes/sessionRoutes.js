const express = require('express');
const sessionController = require('../controllers/sessionController');
const router = express.Router();

// Créer une nouvelle session
router.post('/create', sessionController.createSession);

// Récupérer les sessions d'un utilisateur ou d'un mentor
router.get('/all', sessionController.getSessions);

// Mettre à jour le statut d'une session
router.put('/update-status', sessionController.updateSessionStatus);

module.exports = router;