// Load User model
const User = require("../models/User");
const Character = require("../models/Character");

const battles = require("../game/battles");
const { levelUp } = require("../game/actions");

exports.getCharacter = (req, res) => {
  User.findOne({ _id: req.user.id }).populate("character").then(user => {
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    else {
      res.status(200).json({ character: user.character });
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
          res.status(200).send(true);
        });
      }
      else {
        res.status(200).send(false);
      }
    }
  }).catch(err => console.log(err));
};

exports.getBattle = (req, res) => {
  let battle = battles.getBattle(req.user.id);
  if (!battle) {
    Character.updateOne({ _id: req.user.character._id }, { inBattle: false }).then(() => {
      res.status(200).send(false);
    }).catch(err => console.log(err));
  }
  else {
    res.status(200).send(battle);
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
        stats: {
          vitality: player.stats.vitality,
          strength: player.stats.strength,
          speed: player.stats.speed,
          points: player.stats.points
        },
        health: (info.result === "Victory" ? player.health : (player.stats.vitality * 5)),
        exp: player.exp,
        expMax: player.expMax,
        gold: player.gold
      }, { new: true }).then(character => {
        battle.player = prevPlayer;
        res.status(200).json({ inBattle: false, battle: battle, info: info, character: character });
      }).catch(err => console.log(err));
    }
    else {
      Character.updateOne({ _id: req.user.character._id }, { inBattle: false }).then(() => {
        res.status(200).json({ inBattle: false, battle: battle });
      }).catch(err => console.log(err));
    }
  }
  else {
    res.status(200).json({ inBattle: true, battle: battle });
  }
};

exports.spendPoint = (req, res) => {
  Character.findOne({ _id: req.user.character._id }).then(character => {
    if (character.stats.points <= 0 || !character.stats[req.body.stat]) {
      return res.status(400).json({ error: "Error allocating points" });
    }
    character.stats[req.body.stat] += 1;
    if (req.body.stat === "vitality") {
      character.health += 5;
    }
    character.stats.points -= 1;
    character.save().then(char => {
      res.status(200).json({ character: char });
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
};
