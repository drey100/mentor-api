const Message = require('../models/Message');
const Session = require('../models/Session');

// Créer un nouveau message
exports.createMessage = async (req, res) => {
  try {
    const { sessionId, senderId, content } = req.body;

    // Vérifier si la session existe
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ error: 'Session non trouvée.' });

    const message = new Message({ session: sessionId, sender: senderId, content });
    await message.save();
    res.status(201).json({ message: 'Message créé avec succès.', message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer tous les messages d'une session
exports.getMessagesBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const messages = await Message.find({ session: sessionId })
      .populate('sender', 'name email')
      .sort({ timestamp: 1 });

    res.json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};