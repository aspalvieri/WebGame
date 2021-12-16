const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  character: {
    inBattle: {
      type: Boolean,
      default: false
    },
    health: {
      type: Number,
      default: 200
    },
    maxHealth: {
      type: Number,
      default: 200
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
