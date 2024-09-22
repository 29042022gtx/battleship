import Coordinates from './Coordinates.mjs';
import Gameboard from './Gameboard.mjs';

const display = (() => {
  function pushBoard(
    element = HTMLElement.prototype,
    gameBoard = Gameboard.prototype,
    user = false,
  ) {
    element.innerHTML = '';
    let coorListAll = gameBoard.getCoorListAll();
    if (!user) {
      coorListAll = null;
    }
    for (let y = 0; y < gameBoard.getHeight(); y += 1) {
      for (let x = 0; x < gameBoard.getWidth(); x += 1) {
        const btn = createSquare(x, y, coorListAll);
        element.append(btn);
      }
    }
  }

  function createSquare(
    x,
    y,
    coorListAll = Gameboard.prototype.getCoorListAll(),
  ) {
    const btn = document.createElement('button');
    btn.classList.add('board-square');
    btn.style.gridArea = `${y + 1} / ${x + 1}`;
    btn.setAttribute('data-x', x);
    btn.setAttribute('data-y', y);
    if (coorListAll == null) {
      return btn;
    }
    const coor = new Coordinates(x, y);
    const isShipCell = coorListAll.some((val) => {
      return val.equals(coor);
    });
    if (isShipCell) {
      btn.classList.add('ship-cell');
    }
    return btn;
  }

  return { pushBoard };
})();

export default display;
