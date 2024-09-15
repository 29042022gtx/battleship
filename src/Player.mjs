import Gameboard from './Gameboard.mjs';

class Player {
  #gameBoard;

  constructor() {
    this.#gameBoard = new Gameboard(10, 10, [5, 4, 3, 3, 2]);
    this.#gameBoard.placeAllShips();
  }

  getGameboard() {
    return this.#gameBoard;
  }
}

export default Player;
