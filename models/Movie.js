const mongoose = require('mongoose');
const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

module.exports = mongoose.model('Movie', MovieSchema);