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
      damageMin: player.character.damageMin,
      damageMax: player.character.damageMax,
      health: player.character.health,
      maxHealth: player.character.maxHealth,
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
    return [false];
  }
  let playerDamage = getRndInteger(battle.player.damageMin, battle.player.damageMax);
  let enemyDamage = getRndInteger(battle.enemy.damageMin, battle.enemy.damageMax);
  battle.enemy.health -= playerDamage;
  if (battle.enemy.health <= 0) {
    battles[id] = null;
    let info;
    [battle.player, info] = calculateReward(battle.player, battle.enemy);
    return [false, info, battle.player];
  }
  battle.player.health -= enemyDamage;
  if (battle.player.health <= 0) {
    battles[id] = null;
    let info;
    [battle.player, info] = calculateDefeat(battle.player);
    return [false, info, battle.player];
  }
  battle.takeDamage = enemyDamage;
  battle.sendDamage = playerDamage;
  return [battle];
}
