const express = require('express');
const mentorController = require('../controllers/mentorController');
const { authenticate, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Créer un profil de mentor (réservé aux utilisateurs ayant le rôle "mentor")
router.post('/create-profile', authenticate, authorizeRole(['mentor']), mentorController.createMentorProfile);

// Récupérer tous les mentors (accessible uniquement aux utilisateurs connectés)
router.get('/all', authenticate, mentorController.getAllMentors);

// Récupérer un mentor par ID (accessible uniquement aux utilisateurs connectés)
router.get('/:mentorId', authenticate, mentorController.getMentorById);

// Mettre à jour un mentor (seul le propriétaire du profil peut le modifier)
router.put('/:mentorId', authenticate, mentorController.updateMentor);

// Supprimer un mentor (seul le propriétaire du profil peut le supprimer)
router.delete('/:mentorId', authenticate, mentorController.deleteMentor);

module.exports = router;