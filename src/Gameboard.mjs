import Coordinates from './Coordinates.mjs';
import Ship from './Ship.mjs';

class Gameboard {
  #width;
  #height;
  #board;
  #shipList;
  #missedCoorList = [new Coordinates()];

  constructor(width = 0, height = 0, shipSizes = []) {
    this.#width = Math.floor(Number(width));
    this.#height = Math.floor(Number(height));
    this.#board = this.#createBoard(this.#width, this.#height);
    this.#shipList = this.#createShipList(shipSizes);
    this.#missedCoorList.pop();
  }

  isValidCoorListFor(idx, coorList = [Coordinates.prototype]) {
    const coorListAll = this.getCoorListAllExcept(idx);
    return coorList.every((coor) => {
      return this.#isValidCoor(coorListAll, coor);
    });
  }

  getCoorListAllExcept(idx) {
    const coorList = [];
    const shipList = this.getShipList();
    for (let i in shipList) {
      if (i != idx) {
        coorList.push(...shipList[i].getCoorList());
      }
    }
    return coorList;
  }

  isAllSunk() {
    return this.#shipList.every((ship) => {
      // let s = '';
      // ship.getCoorList().forEach((coor) => {
      //   s += '(' + coor.getX() + ', ' + coor.getY() + '); ';
      // });
      // console.log(s);
      return ship.isSunk();
    });
  }

  getMissedCoorList() {
    return this.#missedCoorList;
  }

  receiveAttack(x, y) {
    const coor = new Coordinates(x, y);
    const hit = this.getShipList().some((ship) => {
      const coorList = ship.getCoorList();
      const isShipCell = coorList.some((val) => {
        return val.equals(coor);
      });
      if (!isShipCell) {
        return false;
      }
      ship.hit();
      return true;
    });

    if (!hit) {
      this.#missedCoorList.push([x, y]);
      return false;
    }

    return true;
  }

  placeAllShips() {
    this.#shipList.forEach((ship) => {
      ship.removeCoorList();
    });
    this.#shipList.forEach((ship, idx) => {
      let placeShipSuccess = false;
      while (!placeShipSuccess) {
        const x = Math.round(Math.random() * 10);
        const y = Math.round(Math.random() * 10);
        placeShipSuccess = this.placeShip(idx, x, y);
      }
    });
  }

  placeShip(shipIdx = 0, x = 0, y = 0) {
    if (shipIdx < 0 || shipIdx >= this.#shipList.length) {
      return false;
    }

    const ship = this.#shipList[shipIdx];
    const coor = new Coordinates(x, y);
    const isNewValidCoorList = this.#isValidCoorList(
      coor.createCoorList(ship.getLength(), ship.isVertical()),
    );

    if (!isNewValidCoorList) {
      return false;
    }
    ship.setCoorList(coor);
    return true;
  }

  getCoorListAll() {
    const coorListAll = [new Coordinates()];
    coorListAll.pop();
    this.#shipList.forEach((ship) => {
      if (ship.getCoorList().length != 0) {
        coorListAll.push(...ship.getCoorList());
      }
    });
    return coorListAll;
  }

  #isValidCoorList(coorList = [new Coordinates()]) {
    const coorListAll = this.getCoorListAll();
    return coorList.every((coor) => {
      return this.#isValidCoor(coorListAll, coor);
    });
  }

  #isOnBoard(coor = new Coordinates()) {
    if (
      coor.getX() < 0 ||
      coor.getX() >= this.getWidth() ||
      coor.getY() < 0 ||
      coor.getY() >= this.getHeight()
    ) {
      return false;
    }
    return true;
  }

  #isValidCoor(coorList = [new Coordinates()], coor = new Coordinates()) {
    return (
      this.#isOnBoard(coor) &&
      coorList.every((item) => {
        return (
          !item.equals(coor) &&
          item.createCoorListAround().every((aroundCoor) => {
            return !aroundCoor.equals(coor);
          })
        );
      })
    );
  }

  getShipList() {
    return this.#shipList;
  }

  getBoard() {
    return this.#board;
  }

  getHeight() {
    return this.#height;
  }

  getWidth() {
    return this.#width;
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

  static exists(array = [], element, callback = () => {}) {
    if (typeof callback != 'function') {
      throw new Error('callback is not specified!');
    }
    return array.some((val) => {
      return callback(val, element);
    });
  }

  #createShipList(shipSizes = []) {
    if (!Array.isArray(shipSizes)) {
      return [];
    }
    const shipList = [new Ship()];
    shipList.pop();
    shipSizes.forEach((size) => {
      shipList.push(new Ship(size));
    });
    return shipList;
  }

  #createBoard(width, height) {
    const arr = [];
    for (let y = 0; y < width; y += 1) {
      for (let x = 0; x < height; x += 1) {
        arr.push([x, y]);
      }
    }
    return arr;
  }
}

export default Gameboard;
