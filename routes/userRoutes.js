const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Créer un utilisateur
router.post('/create', userController.createUser);
// Récupérer tous les utilisateurs
router.get('/:userId', userController.getUserById);
// Mettre à jour un utilisateur
router.put('/:userId', userController.updateUser);
// Supprimer un utilisateur
router.delete('/:userId', userController.deleteUser);


module.exports = router;