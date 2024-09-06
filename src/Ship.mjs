class Ship {
  #length;
  #hitTimes = 0;
  constructor(length = 0) {
    this.#length = Number(length) || 0;
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
}

export default Ship;
