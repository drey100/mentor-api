const Mentor = require('../models/Mentor');
const User = require('../models/User');

exports.createMentorProfile = async (req, res) => {
  try {
    const { userId, expertise, bio } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });

    const mentor = new Mentor({ user: userId, expertise, bio });
    await mentor.save();
    res.status(201).json({ message: 'Profil de mentor créé avec succès.', mentor });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find().populate('user', 'name email');
    res.json({ mentors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un mentor
exports.updateMentor = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const updates = req.body;

    const mentor = await Mentor.findByIdAndUpdate(mentorId, updates, { new: true, runValidators: true });
    if (!mentor) return res.status(404).json({ error: 'Mentor non trouvé.' });

    res.json({ message: 'Mentor mis à jour avec succès.', mentor });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un mentor
exports.deleteMentor = async (req, res) => {
  try {
    const { mentorId } = req.params;

    const mentor = await Mentor.findByIdAndDelete(mentorId);
    if (!mentor) return res.status(404).json({ error: 'Mentor non trouvé.' });

    res.json({ message: 'Mentor supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};