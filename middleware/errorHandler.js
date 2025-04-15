// Middleware pour gérer les erreurs globales
exports.errorHandler = (err, req, res, next) => {
    // Journaliser l'erreur pour le débogage
    console.error(err.stack);
  
    // Vérifier si une réponse a déjà été envoyée
    if (res.headersSent) {
      return next(err);
    }
  
    // Définir un message d'erreur générique ou spécifique
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Une erreur inattendue est survenue.';
  
    // Envoyer une réponse JSON avec le code d'erreur et le message
    res.status(statusCode).json({
      success: false,
      error: message,
    });
  };