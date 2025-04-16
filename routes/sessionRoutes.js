const express = require('express');
const sessionController = require('../controllers/sessionController'); // Assurez-vous que ce chemin est correct
const { authenticate, authorizeRole } = require('../middleware/authMiddleware'); // Assurez-vous que ce chemin est correct
const router = express.Router();

// Créer une session (réservé aux mentors)
router.post('/', authenticate, authorizeRole(['mentor']), sessionController.createSession);

// Récupérer toutes les sessions
router.get('/', authenticate, sessionController.getSessions);

// Mettre à jour une session
router.put('/:sessionId', authenticate, sessionController.updateSession);

// Mettre à jour le statut d'une session
router.patch('/:sessionId/status', authenticate, sessionController.updateSessionStatus);

// Supprimer une session
router.delete('/:sessionId', authenticate, sessionController.deleteSession);

module.exports = router;