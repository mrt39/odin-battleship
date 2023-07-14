let allFunctions = require('./app');
const Ship = allFunctions.Ship;
const Gameboard = allFunctions.Gameboard;
const Player = allFunctions.Player;

test('check if the hit number increases', () => {
  var ship1 = Ship('warship', 3);
  ship1.hit();
  expect(ship1.hits).toBe(1);
});

test('check if the ship sinks after enough number of hits', () => {
  var ship1 = Ship('warship', 3);
  ship1.hit();
  ship1.hit();
  ship1.hit();
  expect(ship1.sunk).toBe(true);
});

test('check if the gameboard registers the horizontal ships placement', () => {
  var gameboard1 = Gameboard()
  gameboard1.position(Ship("submarine", 3), "horizontal", 2, 3)
  expect(gameboard1.x_axis[2][3].name).toBe("submarine");
  expect(gameboard1.x_axis[3][3].name).toBe("submarine");
  expect(gameboard1.x_axis[4][3].name).toBe("submarine");
});

test('check if the gameboard registers the vertical ships placement', () => {
  var gameboard1 = Gameboard()
  gameboard1.position(Ship("submarine", 3), "vertical", 2, 3)
  expect(gameboard1.x_axis[2][3].name).toBe("submarine");
  expect(gameboard1.x_axis[2][4].name).toBe("submarine");
  expect(gameboard1.x_axis[2][5].name).toBe("submarine");
});


test('check if the gameboard registers hits on the board', () => {
  var gameboard1 = Gameboard()
  gameboard1.position(Ship("submarine", 3), "horizontal", 2, 3)
  gameboard1.receiveAttack(2,3);
  expect(gameboard1.submarine.hits).toBe(1);
  gameboard1.receiveAttack(3,3);
  expect(gameboard1.submarine.hits).toBe(2);
  gameboard1.receiveAttack(4,3);
  expect(gameboard1.submarine.sunk).toBe(true);
}); 


test('check if the gameboard registers hits through the Player objects', () => {

  const gameboardComputer = Gameboard()
  const playerUser = Player("user")

  gameboardComputer.position(Ship("submarine", 3), "horizontal", 2, 3)

  playerUser.attack(gameboardComputer, 2, 3)
  expect(gameboardComputer.submarine.hits).toBe(1);

  playerUser.attack(gameboardComputer, 3, 3);
  expect(gameboardComputer.submarine.hits).toBe(2);

}); 