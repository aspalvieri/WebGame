//Vitality: 1 point = 5 health
//Strength: 1 point = ~1.5 damage
//Speed: Chance to hit first, relative to opponent's

exports.enemies = [
  { name: "Test Enemy", level: 1, area: "start",
    expMin: 3, expMax: 8, goldMin: 10, goldMax: 22,
    stats: {
      vitality: 5, strength: 3, speed: 5
  } },
  { name: "Test Enemy 2", level: 1, area: "start",
    expMin: 2, expMax: 6, goldMin: 8, goldMax: 16,
    stats: {
      vitality: 4, strength: 2, speed: 8
  } }
];
