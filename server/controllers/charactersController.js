// Load User model
const User = require("../models/User");

exports.index = (req, res) => {
  User.findOne({ _id: req.user.id }).populate("character").then(user => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    else {
      res.json({ character: user.character });
    }
  })
  .catch(err => console.log(err));
};
