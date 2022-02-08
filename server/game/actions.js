const enemies = require("./enemies").enemies;

exports.getRndInteger = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.levelUp = (player, info) => {
  player.exp -= player.expMax;
  player.expMax += 100;
  player.level += 1;
  player.health = player.stats.vitality * 5;
  player.stats.points += 3;
  info.levelInfo = {
    points: "+3"
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
  player.health = 0;
  let exp = Math.floor(player.exp * 0.25);
  let gold = Math.floor(player.gold * 0.10);
  player.exp -= exp;
  player.gold -= gold;
  info.result = "Defeat";
  info.exp = exp;
  info.gold = gold;
};

exports.findEnemy = (player) => {
  let enems = enemies.filter(e => e.area === player.area);
  let enemy = enems[this.getRndInteger(0, enems.length - 1)];
  enemy.health = enemy.stats.vitality * 5;
  return enemy;
};
