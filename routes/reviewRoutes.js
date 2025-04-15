const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

// Créer un avis
router.post('/create', reviewController.createReview);

// Récupérer les avis d'une session
router.get('/:sessionId/reviews', reviewController.getReviewsBySession);

module.exports = router;