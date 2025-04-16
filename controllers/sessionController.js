const Session = require('../models/Session');
const Mentor = require('../models/Mentor');
const User = require('../models/User');

// Créer une nouvelle session
exports.createSession = async (req, res) => {
  try {
    const { mentorId, userId, title, description, date } = req.body;

    // Vérifier si le mentor existe
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).json({ error: 'Mentor non trouvé.' });

    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });

    const session = new Session({ mentor: mentorId, user: userId, title, description, date });
    await session.save();
    res.status(201).json({ message: 'Session créée avec succès.', session });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer toutes les sessions d'un utilisateur ou d'un mentor
exports.getSessions = async (req, res) => {
  try {
    const { userId, mentorId } = req.query;

    let query = {};
    if (userId) query.user = userId;
    if (mentorId) query.mentor = mentorId;

    const sessions = await Session.find(query)
      .populate('mentor', 'expertise')
      .populate('user', 'name email')
      .sort({ date: -1 });

    res.json({ sessions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour le statut d'une session
exports.updateSessionStatus = async (req, res) => {
  try {
    const { sessionId, status } = req.body;

    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ error: 'Session non trouvée.' });

    session.status = status;
    await session.save();
    res.json({ message: 'Statut de la session mis à jour.', session });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une session
exports.deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findByIdAndDelete(sessionId);
    if (!session) return res.status(404).json({ error: 'Session non trouvée.' });

    res.json({ message: 'Session supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};