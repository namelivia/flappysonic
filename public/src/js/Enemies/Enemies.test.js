import Enemies from './Enemies'

test('adds 1 + 2 to equal 3', () => {
  const myEnemies = new Enemies('spritesheet')
  expect(myEnemies.sum(1, 2)).toBe(3);
});
