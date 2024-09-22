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
computerBoard.addEventListener('click', computerEvent);
pushBoard();

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
  userBoard.removeEventListener('click', userEvent);

  if (user.getGameboard().isAllSunk()) {
    computerBoard.removeEventListener('click', computerEvent);
    showResultDialog('Computer wins!');
    return;
  }
  console.warn(userClicks.length);
  console.log(computerClicks.length);
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
