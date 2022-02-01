const enemies = require("./enemies").enemies;

exports.getRndInteger = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.calculateReward = (player, enemy) => {
  let expReward = this.getRndInteger(enemy.expMin, enemy.expMax);
  let goldReward = this.getRndInteger(enemy.goldMin, enemy.goldMax);
  let info = {};
  player.exp += expReward;
  player.gold += goldReward;
  if (player.exp >= player.expMax) {
    info.levelUp = true;
    player.exp -= player.expMax;
    player.expMax += 100;
    player.level += 1;
    player.maxHealth += 50;
    player.health = player.maxHealth;
    player.damageMin += 1;
    player.damageMax += 2;
  }
  info.result = "Victory";
  info.exp = expReward;
  info.gold = goldReward;
  return [player, info];
};

exports.calculateDefeat = (player) => {
  let exp = Math.floor(player.exp * 0.25);
  let gold = Math.floor(player.gold * 0.10);
  player.exp -= exp;
  player.gold -= gold;
  player.health = player.maxHealth;
  let info = {};
  info.result = "Defeat";
  info.exp = exp;
  info.gold = gold;
  return [player, info];
};

exports.findEnemy = (player) => {
  let enems = enemies.filter(e => e.area === player.area);
  return enems[this.getRndInteger(0, enems.length - 1)];
};
