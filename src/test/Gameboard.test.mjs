import Gameboard from '../Gameboard.mjs';

test('check ship list', () => {
  const gb = new Gameboard();
  expect(gb.placeShip(1, 5, 0)).toBe(true);
  expect(gb.placeShip(0, 0, 0)).toBe(true);
  expect(gb.receiveAttack(0, 0)).toBe(true);

  const shipList = gb.getShipList();
  expect(shipList[0].getLength()).toBe(5);
  expect(shipList[1].getLength()).toBe(4);
  expect(shipList[2].getLength()).toBe(3);
  expect(shipList[3].getLength()).toBe(3);
  expect(shipList[4].getLength()).toBe(2);
});
