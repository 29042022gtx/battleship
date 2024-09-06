import Ship from '../Ship.mjs';

test('no length', () => {
  const ship = new Ship();
  expect(ship.getLength()).toBe(0);
  expect(ship.getHitTimes()).toBe(0);
  expect(ship.isSunk()).toBe(true);
  ship.hit();
  expect(ship.getHitTimes()).toBe(1);
  expect(ship.isSunk()).toBe(true);
});

test('length 3', () => {
  const ship = new Ship(3);
  expect(ship.getLength()).toBe(3);
  expect(ship.getHitTimes()).toBe(0);
  ship.hit();
  expect(ship.getHitTimes()).toBe(1);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
