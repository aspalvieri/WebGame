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
  area: {
    type: String,
    default: "start"
  },
  gold: {
    type: Number,
    default: 0
  },
  damageMin: {
    type: Number,
    default: 8
  },
  damageMax: {
    type: Number,
    default: 20
  },
  speed: {
    type: Number,
    default: 5
  },
  health: {
    type: Number,
    default: 200
  },
  maxHealth: {
    type: Number,
    default: 200
  },
  exp: {
    type: Number,
    default: 0
  },
  expMax: {
    type: Number,
    default: 100
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Character = mongoose.model("characters", CharacterSchema);
