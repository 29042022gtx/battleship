import Gameboard from '../Gameboard.mjs';

const gb = new Gameboard(10, 10, [5, 4, 3, 3, 2]);

test('Create 10 x 10 board', () => {
  expect(gb.getBoard().length).toBe(100);
});

test('Check ship list', () => {
  const shipList = gb.getShipList();
  expect(shipList[0].getLength()).toBe(5);
  expect(shipList[1].getLength()).toBe(4);
  expect(shipList[2].getLength()).toBe(3);
  expect(shipList[3].getLength()).toBe(3);
  expect(shipList[4].getLength()).toBe(2);
});

test('Place ships', () => {
  expect(gb.placeShip(0, 0, 0)).toBe(true);
  expect(gb.placeShip(1, 5, 0)).toBe(true);
});

test('receiveAttack', () => {
  expect(gb.receiveAttack(0, 0)).toBe(true);
  expect(gb.receiveAttack(5, 0)).toBe(true);
});

test('Missed attack', () => {
  expect(gb.receiveAttack(9, 9)).toBe(false);
  expect(gb.getMissedCoorList().length).toBe(1);
  expect(gb.getMissedCoorList()[0][0]).toBe(9);
  expect(gb.getMissedCoorList()[0][1]).toBe(9);
});

test('Is all sunk', () => {
  gb.placeAllShips();
  const board = gb.getBoard();
  for (let i = 0; i < board.length; i += 1) {
    gb.receiveAttack(board[i][0], board[i][1]);
  }
  expect(gb.isAllSunk()).toBe(true);
});
