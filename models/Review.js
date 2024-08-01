const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  rating: { type: Number, required: true },
  comment: { type: String },
});

module.exports = mongoose.model('Review', ReviewSchema);