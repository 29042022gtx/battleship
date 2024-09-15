import Coordinates from './Coordinates.mjs';
import Gameboard from './Gameboard.mjs';

const display = (() => {
  function pushBoard(elementClass = 'user-board', gameBoard = new Gameboard()) {
    const boardContainer = document.querySelector(elementClass);
    boardContainer.innerHTML = '';

    const coorListAll = gameBoard.getCoorListAll();
    for (let y = 1; y < gameBoard.getHeight() + 1; y += 1) {
      for (let x = 1; x < gameBoard.getWidth() + 1; x += 1) {
        const btn = document.createElement('button');
        btn.classList.add('board-square');
        btn.style.gridArea = `${y}/${x}`;
        btn.setAttribute('data-x', x);
        btn.setAttribute('data-y', y);
        const isShipCell = Gameboard.exists(
          coorListAll,
          new Coordinates(x - 1, y - 1),
          (a, b) => {
            return a.equals(b);
          },
        );
        if (isShipCell) {
          btn.classList.add('ship-cell');
        }
        boardContainer.append(btn);
      }
    }
  }

  return { pushBoard };
})();

export default display;
