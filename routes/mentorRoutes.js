const express = require('express');
const mentorController = require('../controllers/mentorController');
const router = express.Router();

router.post('/create-profile', mentorController.createMentorProfile);
// Récupérer tous les mentors
router.get('/all', mentorController.getAllMentors);

// Mettre à jour un mentor
router.put('/:mentorId', mentorController.updateMentor);

// Supprimer un mentor
router.delete('/:mentorId', mentorController.deleteMentor);

module.exports = router;