const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CharacterSchema = new Schema({
  inBattle: {
    type: Boolean,
    default: false
  },
  level: {
    type: Number,
    default: 1
  },
  health: {
    type: Number,
    default: 200
  },
  maxHealth: {
    type: Number,
    default: 200
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Character = mongoose.model("characters", CharacterSchema);
