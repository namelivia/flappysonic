import Game from './Game'

test('adds 1 + 2 to equal 3', () => {
  const myGame = new Game('spritesheet')
  expect(myGame.sum(1, 2)).toBe(3);
});
