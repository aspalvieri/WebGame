const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CharacterSchema = new Schema({
  inBattle: {
    type: Boolean,
    default: false
  },
  area: {
    type: String,
    default: "start"
  },
  level: {
    type: Number,
    default: 1
  },
  gold: {
    type: Number,
    default: 0
  },
  exp: {
    type: Number,
    default: 0
  },
  expMax: {
    type: Number,
    default: 100
  },
  health: {
    type: Number,
    default: 50
  },
  stats: {
    //1 point = 5 health
    vitality: {
      type: Number,
      default: 10
    },
    //1 point = ~1.5 damage
    strength: {
      type: Number,
      default: 5
    },
    //Chance to attack first, relative to opponent's
    speed: {
      type: Number,
      default: 5
    },
    points: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

module.exports = Character = mongoose.model("characters", CharacterSchema);
