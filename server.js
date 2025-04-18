// Importer les dépendances nécessaires
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');
const cors = require('cors');

// Importez les middlewares d'authentification
const { authenticate, authorizeRole } = require('./middleware/authMiddleware'); 

// Charger les variables d'environnement
dotenv.config();

// Initialiser Express
const app = express();

// Configurer CORS
const corsOptions = {
  origin: ['http://127.0.0.1:5500', 'https://tanguy.onrender.com'], // remplace par ton vrai domaine front déployé
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Activer le CORS
app.use(cors(corsOptions));

// Middleware pour parser le JSON
app.use(express.json());

// Logger simple (utile pour déboguer)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Connexion à MongoDB
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

// Routes protégées par l'authentification
app.use('/api/users', authenticate, userRoutes); 
app.use('/api/mentors', authenticate, mentorRoutes); 
app.use('/api/sessions', authenticate, sessionRoutes); 
app.use('/api/messages', authenticate, messageRoutes); 
app.use('/api/reviews', authenticate, reviewRoutes); 
app.use('/api/misc', miscRoutes);

// Route spéciale pour les mentors
app.post('/api/mentors/create-profile', authenticate, authorizeRole(['mentor']), (req, res) => {
  res.json({ message: "Cette route est réservée aux mentors." });
});

// Swagger Docs
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware d’erreurs
app.use(errorHandler);

// Route d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API de mentorat');
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Serveur démarré sur le port ${PORT}`);
});
