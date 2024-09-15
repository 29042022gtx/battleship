class Coordinates {
  #x = 0;
  #y = 0;

  constructor(x = 0, y = 0) {
    this.setX(x);
    this.setY(y);
  }

  createCoorList(length = 0, vertical = true) {
    const lengthNum = Math.floor(Number(length)) || 0;
    const coorList = [this];
    if (vertical) {
      for (let i = 1; i < lengthNum; i++) {
        coorList.push(new Coordinates(this.getX(), this.getY() + i));
      }
      return coorList;
    }
    for (let i = 1; i < lengthNum; i++) {
      coorList.push(new Coordinates(this.getX() + i, this.getY()));
    }
    return coorList;
  }

  createCoorListAround() {
    const coorList = [new Coordinates()];
    coorList.pop();
    const x = this.getX();
    const y = this.getY();
    coorList.push(new Coordinates(x - 1, y - 1));
    coorList.push(new Coordinates(x, y - 1));
    coorList.push(new Coordinates(x + 1, y - 1));
    coorList.push(new Coordinates(x - 1, y));
    coorList.push(new Coordinates(x + 1, y));
    coorList.push(new Coordinates(x - 1, y + 1));
    coorList.push(new Coordinates(x, y + 1));
    coorList.push(new Coordinates(x + 1, y + 1));
    return coorList;
  }

  equals(coor = new Coordinates()) {
    if (!(coor instanceof Coordinates)) {
      return false;
    }
    return this.getX() == coor.getX() && this.getY() == coor.getY();
  }

  getX() {
    return this.#x;
  }

  setX(x) {
    this.#x = Math.floor(Number(x)) || 0;
  }

  getY() {
    return this.#y;
  }

  setY(y) {
    this.#y = Math.floor(Number(y)) || 0;
  }
}

export default Coordinates;
