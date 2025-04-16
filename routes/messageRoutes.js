const express = require('express');
const messageController = require('../controllers/messageController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

// Envoyer un message
router.post('/', authenticate, messageController.sendMessage);

// Récupérer tous les messages d'une session
router.get('/session/:sessionId', authenticate, messageController.getMessagesBySession);

// Supprimer un message (seul l'auteur du message peut le supprimer)
router.delete('/:messageId', authenticate, messageController.deleteMessage);

module.exports = router;