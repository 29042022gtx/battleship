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

test('Create vertical coorList', () => {
  const coorList = coor.createCoorList(3, true)
  expect(coorList[0].equals(new Coordinates(1, 5))).toBe(true);
  expect(coorList[1].equals(new Coordinates(1, 6))).toBe(true);
  expect(coorList[2].equals(new Coordinates(1, 7))).toBe(true);
})

test('Create horizontal coorList', () => {
  const coorList = coor.createCoorList(3, false)
  expect(coorList[0].equals(new Coordinates(1, 5))).toBe(true);
  expect(coorList[1].equals(new Coordinates(2, 5))).toBe(true);
  expect(coorList[2].equals(new Coordinates(3, 5))).toBe(true);
})

test('Around coor list', () => {
  const aroundCoorList = coor.createCoorListAround();
  expect(aroundCoorList[0].equals(new Coordinates(0, 4)))
  expect(aroundCoorList[1].equals(new Coordinates(1, 4)))
  expect(aroundCoorList[3].equals(new Coordinates(0, 5)))
})