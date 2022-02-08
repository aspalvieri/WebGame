const { calculateReward, calculateDefeat, getRndInteger, findEnemy } = require("./actions");

const battles = {};

exports.addBattle = (player) => {
  if (battles[player.id])
    return false;
  let enemy = findEnemy(player.character);
  battles[player.id] = {
    player: {
      name: player.name,
      level: player.character.level,
      health: player.character.health,
      stats: {
        vitality: player.character.stats.vitality,
        strength: player.character.stats.strength,
        speed: player.character.stats.speed,
        points: player.character.stats.points
      },
      exp: player.character.exp,
      expMax: player.character.expMax,
      gold: player.character.gold
    },
    enemy: {
      ...enemy
    }
  };
  return true;
};

exports.getBattle = (id) => {
  let battle = battles[id];
  if (!battle) {
    return false;
  }
  return battle;
}

exports.attack = (id) => {
  let battle = battles[id];
  if (!battle) {
    return [true, false];
  }
  let playerDamage = getRndInteger(battle.player.stats.strength, battle.player.stats.strength * 2);
  let enemyDamage = getRndInteger(battle.enemy.stats.strength, battle.enemy.stats.strength * 2);
  let speedRoll = getRndInteger(1, (battle.player.stats.speed + battle.enemy.stats.speed));
  let info = {};
  battle.takeDamage = enemyDamage;
  battle.sendDamage = playerDamage;
  //Player hits first
  if (battle.player.stats.speed >= speedRoll) {
    battle.first = "Player";
    battle.enemy.health -= playerDamage;
    if (battle.enemy.health <= 0) {
      battles[id] = null;
      calculateReward(battle.player, battle.enemy, info);
      return [true, battle, info, battle.player];
    }
    battle.player.health -= enemyDamage;
    if (battle.player.health <= 0) {
      battles[id] = null;
      calculateDefeat(battle.player, info);
      return [true, battle, info, battle.player];
    }
  }
  //Enemy hits first
  else {
    battle.first = "Enemy";
    battle.player.health -= enemyDamage;
    if (battle.player.health <= 0) {
      battles[id] = null;
      calculateDefeat(battle.player, info);
      return [true, battle, info, battle.player];
    }
    battle.enemy.health -= playerDamage;
    if (battle.enemy.health <= 0) {
      battles[id] = null;
      calculateReward(battle.player, battle.enemy, info);
      return [true, battle, info, battle.player];
    }
  }
  return [false, battle];
}
