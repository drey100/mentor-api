const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expertise: { type: String, required: true },
  bio: { type: String },
  rating: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Mentor', mentorSchema);