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