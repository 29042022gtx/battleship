import './style.css';
import Player from './Player.mjs';
import display from './display.mjs';
import Coordinates from './Coordinates.mjs';

const user = new Player();
const computer = new Player();
const userClicks = [Coordinates.prototype];
userClicks.pop();
const computerClicks = [Coordinates.prototype];
computerClicks.pop();
const computerBoard = document.querySelector('.computer-board');
pushBoard();
const userBoard = getElement('.user-board');
let head = HTMLElement.prototype;
let idx = 0;
let gapX = 0;
let gapY = 0;
userBoard.addEventListener('mousedown', mousedown);
const startBtn = getElement('#start');
startBtn.addEventListener('click', () => {
  computerBoard.addEventListener('click', computerEvent);
  userBoard.removeEventListener('mousedown', mousedown);
  startBtn.classList.add('started');
});
const randomizeBtn = getElement('#randomize');
randomizeBtn.addEventListener('click', () => {
  user.getGameboard().placeAllShips();
  const userBoard = getElement('.user-board');
  display.pushBoard(userBoard, user.getGameboard(), true);
});

function mousedown(e = MouseEvent.prototype) {
  const target = toElement(e.target);
  if (!target.classList.contains('board-ship')) {
    return;
  }
  idx = parseInt(target.getAttribute('data-idx'));
  const square = getElementXY(e.clientX, e.clientY);
  if (target.offsetHeight > target.offsetWidth) {
    gapX = 0;
    gapY = square.offsetTop - target.offsetTop;
  } else {
    gapY = 0;
    gapX = square.offsetLeft - target.offsetLeft;
  }
  head = getElementXY(e.clientX - gapX, e.clientY - gapY);
  document.addEventListener('mouseup', mouseup);
  document.addEventListener('mouseup', removeMousemoveup);
  userBoard.addEventListener('mousemove', mousemove);
}

function mouseup() {
  if (head == null) {
    return;
  }
  unMarkSquares(head, idx);
  const coorList = coorListFromHead(head, idx);
  if (!isValidPosision(coorList, idx)) {
    return;
  }
  const boardShip = shipIdxtoElement(idx);
  const ship = user.getGameboard().getShipList()[idx];
  let [x, y] = getDataXY(head);
  ship.setCoorList(new Coordinates(x, y));
  boardShip.style.gridArea = display.shipToGridArea(ship);
  // console.log(boardShip.style.gridArea);
}

function mousemove(e = MouseEvent.prototype) {
  unMarkSquares(head, idx);
  head = getElementXY(e.clientX - gapX, e.clientY - gapY);
  markSquares(head, idx);
}

function unMarkSquares(head = HTMLElement.prototype, idx) {
  if (head == null) {
    return;
  }
  const coorList = coorListFromHead(head, idx);
  const idList = getSquareIdx(coorList);
  let className = 'valid-square';
  if (userBoard.children[idList[0]].classList.contains('invalid-square')) {
    className = 'invalid-square';
  }
  for (let i of idList) {
    userBoard.children[i].classList.remove(className);
  }
}

function markSquares(head = HTMLElement.prototype, idx) {
  if (head == null) {
    return;
  }
  const coorList = coorListFromHead(head, idx);
  let className = 'valid-square';
  if (!isValidPosision(coorList, idx)) {
    className = 'invalid-square';
  }
  const idList = getSquareIdx(coorList);
  for (let i of idList) {
    userBoard.children[i].classList.add(className);
  }
}

function coorListFromHead(head = HTMLElement.prototype, idx) {
  const ship = user.getGameboard().getShipList()[idx];
  let [x, y] = getDataXY(head);
  const coor = new Coordinates(x, y);
  return coor.createCoorList(ship.getLength(), ship.isVertical());
}

function isValidPosision(coorList = [Coordinates.prototype], idx) {
  return user.getGameboard().isValidCoorListFor(idx, coorList);
}

function getSquareIdx(coorList = [Coordinates.prototype]) {
  const arr = [];
  let maxLength =
    user.getGameboard().getWidth() * user.getGameboard().getHeight();
  for (let coor of coorList) {
    let idx = coorToNum(coor.getX(), coor.getY());
    if (idx >= 0 && idx < maxLength) {
      arr.push(idx);
    }
  }
  return arr;
}

function getDataXY(element = HTMLElement.prototype) {
  return [element.getAttribute('data-x'), element.getAttribute('data-y')];
}

function shipIdxtoElement(idx) {
  let elementList = userBoard.children;
  for (let i = 0; i < elementList.length; i += 1) {
    let element = toElement(elementList[i]);
    let currentIdx = parseInt(element.getAttribute('data-idx'));
    if (currentIdx == idx) {
      return element;
    }
  }
  return toElement(null);
}

function getElementXY(clientX, clientY) {
  // clientX = 10;
  // clientY = 10;
  let elementList = userBoard.children;
  for (let i = 0; i < elementList.length; i += 1) {
    let element = toElement(elementList[i]);
    let offsetRight = element.offsetLeft + element.offsetWidth;
    let offsetBottom = element.offsetTop + element.offsetHeight;
    if (
      element.offsetLeft <= clientX &&
      element.offsetTop <= clientY &&
      offsetRight > clientX &&
      offsetBottom > clientY
    ) {
      return element;
    }
  }
  return toElement(null);
}

function removeMousemoveup() {
  userBoard.removeEventListener('mousemove', mousemove);
  document.removeEventListener('mouseup', mouseup);
  document.removeEventListener('mouseup', removeMousemoveup);
}

function computerEvent(e = Event.prototype) {
  const validComputerClick = gameBoardEvent(e, computer, computerClicks);
  if (!validComputerClick) {
    return;
  }
  if (computer.getGameboard().isAllSunk()) {
    computerBoard.removeEventListener('click', computerEvent);
    showResultDialog('You win!');
    return;
  }
  const idx = getComputerClickIDX();
  const userBoard = document.querySelector('.user-board');
  userBoard.addEventListener('click', userEvent);
  userBoard.children[idx].click();
  // userBoard.removeEventListener('click', userEvent);

  if (user.getGameboard().isAllSunk()) {
    computerBoard.removeEventListener('click', computerEvent);
    showResultDialog('Computer wins!');
    return;
  }
}

function getComputerClickIDX() {
  let x = getRanNum(10);
  let y = getRanNum(10);
  while (!isUniqueClick(x, y, userClicks)) {
    x = getRanNum(10);
    y = getRanNum(10);
  }
  return coorToNum(x, y);
}

function isUniqueClick(x, y, clicks = [Coordinates.prototype]) {
  const coor = new Coordinates(x, y);
  return !clicks.some((val) => {
    return val.equals(coor);
  });
}

function userEvent(e = Event.prototype) {
  gameBoardEvent(e, user, userClicks);
}

function gameBoardEvent(
  e = Event.prototype,
  player = Player.prototype,
  clicks = [Coordinates.prototype],
) {
  const gameBoard = player.getGameboard();
  const target = toElement(e.target);
  const x = target.getAttribute('data-x');
  const y = target.getAttribute('data-y');
  if (x == null || y == null) {
    return false;
  }
  if (!isUniqueClick(x, y, clicks)) {
    return false;
  }
  clicks.push(new Coordinates(x, y));
  const hit = gameBoard.receiveAttack(x, y);
  if (hit) {
    target.classList.add('hit-cell');
    return true;
  }
  target.classList.add('missed-square');
  return true;
}

function coorToNum(x, y) {
  checkNum(x, y);
  return x + y * 10;
}

function checkNum(...args) {
  args.forEach((val) => {
    const num = Number(val);
    if (isNaN(num)) {
      throw new Error('Input is not a number');
    }
  });
  return true;
}

function getRanNum(limit = 1) {
  return Math.floor(Math.random() * limit);
}

function toElement(element = HTMLElement.prototype) {
  return element;
}

function getElement(selector = '') {
  let element = HTMLElement.prototype;
  element = document.querySelector(selector);
  return element;
}

function pushBoard() {
  const userBoard = document.querySelector('.user-board');
  const computerBoard = document.querySelector('.computer-board');
  display.pushBoard(userBoard, user.getGameboard(), true);
  display.pushBoard(computerBoard, computer.getGameboard(), false);
}

function showResultDialog(s = '') {
  const dialog = document.querySelector('dialog');
  const message = dialog.querySelector('.message');
  message.textContent = s;
  dialog.showModal();
}
