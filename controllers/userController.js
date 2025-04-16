const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, avatar, bio } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Cet email est déjà utilisé.' });

    const user = new User({ name, email, password, role, avatar, bio });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès.', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });

    res.json({ message: 'Utilisateur mis à jour avec succès.', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });

    res.json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};