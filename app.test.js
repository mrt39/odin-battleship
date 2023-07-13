const Ship = require('./app');

test('check if the hit number increases', () => {
  var ship1 = Ship('Warship', 3);
  ship1.hit();
  expect(ship1.hits).toBe(1);
});

test('check if the ship sunks after enough number of hits', () => {
  var ship1 = Ship('Warship', 3);
  ship1.hit();
  ship1.hit();
  ship1.hit();
  expect(ship1.sunk).toBe(true);
});