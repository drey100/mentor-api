const express = require('express');
const reviewController = require('../controllers/reviewController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

// Laisser un avis
router.post('/', authenticate, reviewController.createReview);

// Récupérer tous les avis pour un mentor
router.get('/mentor/:mentorId', authenticate, reviewController.getReviewsByMentor);

// Mettre à jour un avis (seul l'auteur de l'avis peut le modifier)
router.put('/:reviewId', authenticate, reviewController.updateReview);

// Supprimer un avis (seul l'auteur de l'avis peut le supprimer)
router.delete('/:reviewId', authenticate, reviewController.deleteReview);

module.exports = router;