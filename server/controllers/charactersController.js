// Load User model
const User = require("../models/User");
const Character = require("../models/Character");

const battles = require("../game/battles");
const { levelUp } = require("../game/actions");

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

exports.findBattle = (req, res) => {
  User.findOne({ _id: req.user.id }).populate("character").then(user => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    else {
      if (battles.addBattle(user)) {
        user.character.inBattle = true;
        user.character.save().then(() => {
          res.send(true);
        });
      }
      else {
        res.send(false);
      }
    }
  })
  .catch(err => console.log(err));
};

exports.getBattle = (req, res) => {
  let battle = battles.getBattle(req.user.id);
  if (!battle) {
    Character.updateOne({ _id: req.user.character._id }, { inBattle: false }).then(() => {
      res.send(false);
    }).catch(err => console.log(err));
  }
  else {
    res.send(battle);
  }
};

exports.attack = (req, res) => {
  let [complete, battle, info, player] = battles.attack(req.user.id);
  if (complete) {
    if (info && (info.result === "Victory" || info.result === "Defeat")) {
      let prevPlayer = {...player};
      if (info.levelUp) {
        levelUp(player, info);
      }
      Character.findOneAndUpdate({ _id: req.user.character._id }, { 
        inBattle: false,
        level: player.level,
        damageMin: player.damageMin,
        damageMax: player.damageMax,
        maxHealth: player.maxHealth,
        health: (info.result === "Victory" ? player.health : player.maxHealth),
        exp: player.exp,
        expMax: player.expMax,
        gold: player.gold
      }, { new: true }).then(character => {
        battle.player = prevPlayer;
        res.json({ inBattle: false, battle: battle, info: info, character: character });
      }).catch(err => console.log(err));
    }
    else {
      Character.updateOne({ _id: req.user.character._id }, { inBattle: false }).then(() => {
        res.json({ inBattle: false, battle: battle });
      }).catch(err => console.log(err));
    }
  }
  else {
    res.json({ inBattle: true, battle: battle });
  }
}
