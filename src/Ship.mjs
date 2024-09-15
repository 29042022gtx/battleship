import Coordinates from './Coordinates.mjs';

class Ship {
  #length = 0;
  #orientation = 0;
  #coorList = [new Coordinates()];
  #hitTimes = 0;

  constructor(length = 0, coor = new Coordinates()) {
    this.#setLength(length);
    this.#orientation = this.createOrientation();
    this.#coorList.pop();
    // this.#coorList = coor.createCoorList(this.getLength, this.isVertical);
  }

  #setLength(length) {
    const lengthNum = Math.floor(Number(length)) || 0;
    if (lengthNum < 0) {
      return;
    }
    this.#length = lengthNum;
  }

  setCoorList(coor = new Coordinates()) {
    this.#coorList = coor.createCoorList(this.getLength(), this.isVertical());
  }

  getCoorList() {
    return this.#coorList;
  }

  getLength() {
    return this.#length;
  }

  getHitTimes() {
    return this.#hitTimes;
  }

  hit() {
    this.#hitTimes += 1;
  }

  isSunk() {
    return this.getHitTimes() >= this.getLength();
  }

  isHorizontal() {
    return !this.#orientation;
  }

  isVertical() {
    return this.#orientation;
  }

  createOrientation() {
    return !!Math.round(Math.random() * 2);
  }
}

export default Ship;
