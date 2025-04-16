const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inscription d'un utilisateur
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Un utilisateur avec cet email existe déjà.' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Connexion d'un utilisateur
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Identifiants incorrects.' });

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Identifiants incorrects.' });

    // Générer un token JWT
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id; // ID de l'utilisateur connecté

    // Vérifier que l'utilisateur connecté accède à son propre profil
    if (userId !== currentUserId.toString()) {
      return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à accéder à ce profil.' });
    }

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
    const currentUserId = req.user._id; // ID de l'utilisateur connecté
    const updates = req.body;

    // Vérifier que l'utilisateur connecté modifie son propre profil
    if (userId !== currentUserId.toString()) {
      return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à modifier ce profil.' });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select('-password');
    res.json({ message: 'Utilisateur mis à jour avec succès.', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id; // ID de l'utilisateur connecté

    // Vérifier que l'utilisateur connecté supprime son propre compte
    if (userId !== currentUserId.toString()) {
      return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à supprimer ce compte.' });
    }

    await User.findByIdAndDelete(userId);
    res.json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};