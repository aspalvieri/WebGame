const enemies = require("./enemies").enemies;

exports.getRndInteger = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.levelUp = (player, info) => {
  player.exp -= player.expMax;
  player.expMax += 100;
  player.level += 1;
  player.maxHealth += 50;
  player.health = player.maxHealth;
  player.damageMin += 1;
  player.damageMax += 2;
  info.levelInfo = {
    health: "50",
    damage: "1-2"
  };
}

exports.calculateReward = (player, enemy, info) => {
  enemy.health = 0;
  let expReward = this.getRndInteger(enemy.expMin, enemy.expMax);
  let goldReward = this.getRndInteger(enemy.goldMin, enemy.goldMax);
  player.exp += expReward;
  player.gold += goldReward;
  if (player.exp >= player.expMax) {
    info.levelUp = true;
  }
  info.result = "Victory";
  info.exp = expReward;
  info.gold = goldReward;
};

exports.calculateDefeat = (player, info) => {
  let exp = Math.floor(player.exp * 0.25);
  let gold = Math.floor(player.gold * 0.10);
  player.exp -= exp;
  player.gold -= gold;
  player.health = 0;
  info.result = "Defeat";
  info.exp = exp;
  info.gold = gold;
};

exports.findEnemy = (player) => {
  let enems = enemies.filter(e => e.area === player.area);
  return enems[this.getRndInteger(0, enems.length - 1)];
};
