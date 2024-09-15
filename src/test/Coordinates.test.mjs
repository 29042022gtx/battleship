import Coordinates from '../Coordinates.mjs';

const coor = new Coordinates(0, 5);
test('getX() == 0', () => {
  expect(coor.getX()).toBe(0);
});
test('getY() == 5', () => {
  expect(coor.getY()).toBe(5);
});

test('getX() == 1', () => {
  coor.setX(1);
  expect(coor.getX()).toBe(1);
  expect(coor.equals(new Coordinates(1, 5))).toBe(true);
});

test('equals(new Coordinates(1, 5) == true', () => {
  expect(coor.equals(new Coordinates(1, 5))).toBe(true);
});
