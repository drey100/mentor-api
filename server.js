// Importer les dépendances nécessaires
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

// Importez les middlewares d'authentification
const { authenticate, authorizeRole } = require('./middleware/authMiddleware'); // Ajout ici

// Charger les variables d'environnement
dotenv.config();

// Initialiser Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Connexion à la base de données MongoDB
connectDB();

// Importer les routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const messageRoutes = require('./routes/messageRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const miscRoutes = require('./routes/miscRoutes');

// Définir les routes publiques
app.use('/api/auth', authRoutes);

// Définir les routes protégées par authentification
app.use('/api/users', authenticate, userRoutes); // Toutes les routes utilisateur nécessitent une authentification
app.use('/api/mentors', authenticate, mentorRoutes); // Toutes les routes mentor nécessitent une authentification
app.use('/api/sessions', authenticate, sessionRoutes); // Toutes les routes session nécessitent une authentification
app.use('/api/messages', authenticate, messageRoutes); // Toutes les routes message nécessitent une authentification
app.use('/api/reviews', authenticate, reviewRoutes); // Toutes les routes avis nécessitent une authentification
app.use('/api/misc', miscRoutes);

// Exemple d'utilisation de `authorizeRole` pour une route spécifique
app.post('/api/mentors/create-profile', authenticate, authorizeRole(['mentor']), (req, res) => {
  res.json({ message: "Cette route est réservée aux mentors." });
});

// Configuration Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Assurez-vous que ce chemin est correct

// Route pour servir la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware de gestion des erreurs
app.use(errorHandler);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});