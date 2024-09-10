import Coordinates from './Coordinates.mjs';
import Ship from './Ship.mjs';

class Gameboard {
  #board;
  #shipList;
  #missedCoordinates = [];

  constructor() {
    this.#board = Gameboard.createBoard();
    this.#shipList = Gameboard.createShipList();
  }

  receiveAttack(x, y) {
    if (!this.isOnBoard(new Coordinates(x, y))) {
      return false;
    }
    const hit = this.#shipList.some((ship) => {
      const hit = ship.getCoorList().some((item) => {
        return item.equals(new Coordinates(x, y));
      });
      if (!hit) {
        return false;
      }
      ship.hit();
      return true;
    });

    if (!hit) {
      this.#missedCoordinates.push([x, y]);
      return false;
    }

    return true;
  }

  isValidCoorList(
    coorList1 = [new Coordinates()],
    coorList2 = [new Coordinates()],
  ) {
    return coorList2.every((item) => {
      return this.isValidCoor(coorList1, item);
    });
  }

  isValidCoor(coorList = [new Coordinates()], coor = new Coordinates()) {
    return (
      coorList.every((item) => {
        return !item.equals(coor);
      }) && this.isOnBoard(coor)
    );
  }

  isOnBoard(coor = new Coordinates()) {
    const width = 10;
    const height = 10;
    if (
      coor.getX() < 0 ||
      coor.getX() >= width ||
      coor.getY() < 0 ||
      coor.getY() >= height
    ) {
      return false;
    }
    return true;
  }

  placeShip(shipIdx = 0, x = 0, y = 0) {
    if (
      !this.isOnBoard(new Coordinates(x, y)) ||
      shipIdx < 0 ||
      shipIdx >= this.#shipList.length
    ) {
      return false;
    }

    const coorListAll = [];
    this.#shipList.forEach((ship) => {
      coorListAll.push(...Gameboard.getShipCoordinates(ship));
    });

    const ship = this.#shipList[shipIdx];
    const coor = new Coordinates(x, y);
    const isNewValidCoorList = this.isValidCoorList(
      coorListAll,
      coor.createCoorList(ship.getLength()),
    );

    // coor.createCoorList(ship.getLength()).forEach((item) => {
    //   console.log(`${item.getX()}, ${item.getY()}`);
    // });
    console.log(isNewValidCoorList);
    if (!isNewValidCoorList) {
      return false;
    }
    ship.setCoorList(coor);
    return true;
  }

  getShipList() {
    return this.#shipList;
  }

  getBoard() {
    return this.#board;
  }

  printBoard() {
    let s = '';
    for (let i = 0; i < 100; i += 1) {
      s += this.#board[i] + ' ';
      if (i % 10 == 9) {
        console.log(s);
        s = '';
      }
    }
  }

  static getShipCoordinates(ship = new Ship()) {
    if (ship.getCoorList().length == 0) {
      return [];
    }
    return ship.getCoorList();
  }

  static exists(array = [], element, callback = () => {}) {
    if (typeof callback != 'function') {
      throw new Error('callback is not specified!');
    }
    return array.some((val) => {
      return callback(val, element);
    });
  }

  static createShipList() {
    const shipSizes = [5, 4, 3, 3, 2];
    const shipList = [new Ship()];
    shipList.pop();
    shipSizes.forEach((size) => {
      shipList.push(new Ship(size));
    });
    return shipList;
  }

  static createBoard() {
    const width = 10;
    const height = 10;
    const arr = [];
    for (let y = 0; y < width; y += 1) {
      for (let x = 0; x < height; x += 1) {
        arr.push([x, y]);
      }
    }
    return arr;
  }
}

// console.log('\x1b[2J\x1b[3J\x1b[H');
// const gb1 = new Gameboard();
// gb1.printBoard();
// // gb1.placeShip(0, 0, 0)
// // gb1.placeShip(1, 0, 0)
// console.log(gb1.placeShip(0, 0, 0));
// console.log(gb1.placeShip(1, 5, 5));
// console.log(gb1.receiveAttack(0, 2));

export default Gameboard;
