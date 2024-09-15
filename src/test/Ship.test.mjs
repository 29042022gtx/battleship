import Ship from '../Ship.mjs';

const ship1 = new Ship();

test('Ship without length is sunk', () => {
  expect(ship1.isSunk()).toBe(true);
});

test('Initial hitTimes == 0', () => {
  expect(ship1.getHitTimes()).toBe(0);
});

test('Increase hitTimes', () => {
  ship1.hit();
  expect(ship1.getHitTimes()).toBe(1);
  expect(ship1.isSunk()).toBe(true);
});

test('Ship is sunk when hitTimes >= length', () => {
  expect(ship1.isSunk()).toBe(true);
});

const ship2 = new Ship(3);
test('Initial length = 3', () => {
  expect(ship2.getLength()).toBe(3);
});

test('Ship is not sunk when hitTimes < length', () => {
  expect(ship2.isSunk()).toBe(false);
});

test('Ship is sunk when hitTimes >= length', () => {
  ship2.hit();
  ship2.hit();
  ship2.hit();
  expect(ship2.isSunk()).toBe(true);
});
