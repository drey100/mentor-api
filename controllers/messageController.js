const Message = require('../models/Message');

// Envoyer un message
exports.sendMessage = async (req, res) => {
  try {
    const { sessionId, content } = req.body;
    const userId = req.user._id; // ID de l'utilisateur connecté

    // Créer le message
    const message = new Message({ session: sessionId, user: userId, content });
    await message.save();

    res.status(201).json({ message: 'Message envoyé avec succès.', message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer tous les messages d'une session
exports.getMessagesBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const messages = await Message.find({ session: sessionId }).populate('user', 'name email');
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un message
exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id; // ID de l'utilisateur connecté

    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ error: 'Message non trouvé.' });

    // Vérifier que l'utilisateur connecté est l'auteur du message
    if (message.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à supprimer ce message.' });
    }

    await Message.findByIdAndDelete(messageId);
    res.json({ message: 'Message supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};