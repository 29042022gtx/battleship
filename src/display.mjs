import Coordinates from './Coordinates.mjs';
import Gameboard from './Gameboard.mjs';
import Ship from './Ship.mjs';

const display = (() => {
  function pushBoard(
    element = HTMLElement.prototype,
    gameBoard = Gameboard.prototype,
    user = false,
  ) {
    element.innerHTML = '';
    if (!user) {
      pushSquares(element, gameBoard);
      return;
    }
    pushShipCell(element, gameBoard);
  }

  function pushShipCell(
    element = HTMLElement.prototype,
    gameBoard = Gameboard.prototype,
  ) {
    const coorListAll = gameBoard.getCoorListAll();
    for (let y = 0; y < gameBoard.getHeight(); y += 1) {
      for (let x = 0; x < gameBoard.getWidth(); x += 1) {
        const btn = createShipCell(x, y, coorListAll);
        element.append(btn);
      }
    }

    const shipList = gameBoard.getShipList();
    for (let i = 0; i < shipList.length; i += 1) {
      const shipContainer = createShipContainer(shipList[i], i);
      element.append(shipContainer);
    }
  }

  function createShipContainer(ship = Ship.prototype, idx) {
    const div = document.createElement('div');
    div.classList.add('board-ship');
    div.setAttribute('data-idx', idx);
    // div.setAttribute('draggable', true);
    div.style.gridArea = shipToGridArea(ship);

    return div;
  }

  function shipToGridArea(ship = Ship.prototype) {
    const dau = ship.getCoorList()[0];
    const length = ship.getLength();
    let gridArea = dau.getY() + 1 + ' / ' + (dau.getX() + 1) + '/';
    if (ship.isVertical()) {
      gridArea += 'span ' + length + '/' + 'span 1';
    } else {
      gridArea += 'span 1' + '/' + 'span ' + length;
    }
    return gridArea;
  }

  function createShipCell(
    x,
    y,
    coorListAll = Gameboard.prototype.getCoorListAll(),
  ) {
    const btn = createSquare(x, y);
    const coor = new Coordinates(x, y);
    const isShipCell = coorListAll.some((val) => {
      return val.equals(coor);
    });
    if (isShipCell) {
      btn.classList.add('ship-cell');
    }
    return btn;
  }

  function pushSquares(
    element = HTMLElement.prototype,
    gameBoard = Gameboard.prototype,
  ) {
    for (let y = 0; y < gameBoard.getHeight(); y += 1) {
      for (let x = 0; x < gameBoard.getWidth(); x += 1) {
        const btn = createSquare(x, y);
        element.append(btn);
      }
    }
  }

  function createSquare(x, y) {
    const btn = document.createElement('button');
    btn.classList.add('board-square');
    btn.style.gridArea = `${y + 1} / ${x + 1}`;
    btn.setAttribute('data-x', x);
    btn.setAttribute('data-y', y);
    return btn;
  }

  return { pushBoard, shipToGridArea };
})();

export default display;
