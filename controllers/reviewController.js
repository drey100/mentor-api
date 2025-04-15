const Review = require('../models/Review');
const Session = require('../models/Session');

// Créer un avis
exports.createReview = async (req, res) => {
  try {
    const { sessionId, reviewerId, rating, comment } = req.body;

    // Vérifier si la session existe
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ error: 'Session non trouvée.' });

    const review = new Review({ session: sessionId, reviewer: reviewerId, rating, comment });
    await review.save();
    res.status(201).json({ message: 'Avis créé avec succès.', review });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer tous les avis pour une session
exports.getReviewsBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const reviews = await Review.find({ session: sessionId })
      .populate('reviewer', 'name email')
      .sort({ createdAt: -1 });

    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};