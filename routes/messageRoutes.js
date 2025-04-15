const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();

// Créer un message
router.post('/create', messageController.createMessage);

// Récupérer les messages d'une session
router.get('/:sessionId/messages', messageController.getMessagesBySession);

module.exports = router;