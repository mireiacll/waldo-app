const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  x: { type: Number, required: true }, // percentage from left (0-100)
  y: { type: Number, required: true }, // percentage from top (0-100)
  tolerance: { type: Number, default: 5 } // how big the hitbox is in %
});

module.exports = mongoose.model('Character', characterSchema);