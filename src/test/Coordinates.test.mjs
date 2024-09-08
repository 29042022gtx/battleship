import Coordinates from '../Coordinates.mjs';

test('0, 5', () => {
  const coor = new Coordinates(0, 5);
  expect(coor.getX()).toBe(0);
  expect(coor.getY()).toBe(5);
  coor.setX(1);
  expect(coor.getX()).toBe(1);
  expect(coor.equals(new Coordinates(1, 5))).toBe(true);
});
