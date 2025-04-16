const Mentor = require('../models/Mentor');

// Créer un profil de mentor
exports.createMentorProfile = async (req, res) => {
  try {
    const userId = req.user._id; // ID de l'utilisateur connecté
    const { expertise, bio } = req.body;

    // Vérifier si l'utilisateur a déjà un profil de mentor
    const existingProfile = await Mentor.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ error: 'Vous avez déjà un profil de mentor.' });
    }

    // Créer le profil de mentor
    const mentor = new Mentor({ user: userId, expertise, bio });
    await mentor.save();

    res.status(201).json({ message: 'Profil de mentor créé avec succès.', mentor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer tous les mentors
exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find().populate('user', 'name email'); // Récupère les informations de l'utilisateur associé
    res.json({ mentors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un mentor par ID
exports.getMentorById = async (req, res) => {
  try {
    const { mentorId } = req.params;

    const mentor = await Mentor.findById(mentorId).populate('user', 'name email');
    if (!mentor) return res.status(404).json({ error: 'Mentor non trouvé.' });

    res.json({ mentor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un mentor
exports.updateMentor = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const userId = req.user._id; // ID de l'utilisateur connecté

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).json({ error: 'Mentor non trouvé.' });

    // Vérifier que l'utilisateur connecté est le propriétaire du profil
    if (mentor.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à modifier ce profil.' });
    }

    const updates = req.body;
    const updatedMentor = await Mentor.findByIdAndUpdate(mentorId, updates, { new: true, runValidators: true });
    res.json({ message: 'Mentor mis à jour avec succès.', mentor: updatedMentor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un mentor
exports.deleteMentor = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const userId = req.user._id; // ID de l'utilisateur connecté

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).json({ error: 'Mentor non trouvé.' });

    // Vérifier que l'utilisateur connecté est le propriétaire du profil
    if (mentor.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à supprimer ce profil.' });
    }

    await Mentor.findByIdAndDelete(mentorId);
    res.json({ message: 'Mentor supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};