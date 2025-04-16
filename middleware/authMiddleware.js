const jwt = require('jsonwebtoken');

// Middleware pour vérifier l'authentification
exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authentification requise. Token manquant.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajoute les informations de l'utilisateur au request object
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide.' });
  }
};

// Middleware pour vérifier les rôles
exports.authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Accès refusé. Rôle non autorisé.' });
    }
    next();
  };
};