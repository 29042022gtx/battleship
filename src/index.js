import './style.css';
import Player from './Player.mjs';
import display from './display.mjs';

const player = new Player();
player.getGameboard().placeAllShips();
const computer = new Player();
display.pushBoard('.user-board', player.getGameboard());
display.pushBoard('.computer-board', computer.getGameboard());
