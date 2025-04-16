const Review = require('../models/Review');

// Laisser un avis
exports.createReview = async (req, res) => {
  try {
    const { mentorId, rating, comment } = req.body;
    const userId = req.user._id; // ID de l'utilisateur connecté

    // Créer l'avis
    const review = new Review({ mentor: mentorId, user: userId, rating, comment });
    await review.save();

    res.status(201).json({ message: 'Avis créé avec succès.', review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer tous les avis pour un mentor
exports.getReviewsByMentor = async (req, res) => {
  try {
    const { mentorId } = req.params;

    const reviews = await Review.find({ mentor: mentorId }).populate('user', 'name email');
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un avis
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id; // ID de l'utilisateur connecté

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: 'Avis non trouvé.' });

    // Vérifier que l'utilisateur connecté est l'auteur de l'avis
    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à modifier cet avis.' });
    }

    const updates = req.body;
    const updatedReview = await Review.findByIdAndUpdate(reviewId, updates, { new: true, runValidators: true });
    res.json({ message: 'Avis mis à jour avec succès.', review: updatedReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un avis
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id; // ID de l'utilisateur connecté

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ error: 'Avis non trouvé.' });

    // Vérifier que l'utilisateur connecté est l'auteur de l'avis
    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à supprimer cet avis.' });
    }

    await Review.findByIdAndDelete(reviewId);
    res.json({ message: 'Avis supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};