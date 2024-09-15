import Player from '../Player.mjs';

test('Player gameboard length == 100', () => {
  const player = new Player();
  const board = player.getGameboard().getBoard();
  expect(board.length).toBe(100);
});
