// Importer les dépendances nécessaires
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

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

// Définir les routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/misc', miscRoutes);

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