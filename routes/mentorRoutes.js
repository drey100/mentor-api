const express = require('express');
const mentorController = require('../controllers/mentorController');
const router = express.Router();

router.post('/create-profile', mentorController.createMentorProfile);
router.get('/all', mentorController.getAllMentors);

module.exports = router;