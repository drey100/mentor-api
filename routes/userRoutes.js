const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

// Inscription d'un utilisateur (publique)
router.post('/register', userController.registerUser);

// Connexion d'un utilisateur (publique)
router.post('/login', userController.loginUser);

// Récupérer un utilisateur par ID (seul l'utilisateur connecté peut accéder à son propre profil)
router.get('/:userId', authenticate, userController.getUserById);

// Mettre à jour un utilisateur (seul l'utilisateur connecté peut modifier son propre profil)
router.put('/:userId', authenticate, userController.updateUser);

// Supprimer un utilisateur (seul l'utilisateur connecté peut supprimer son propre compte)
router.delete('/:userId', authenticate, userController.deleteUser);

module.exports = router;