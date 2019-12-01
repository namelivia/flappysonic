import Sonic from './Sonic'

test('adds 1 + 2 to equal 3', () => {
  const mySonic = new Sonic('spritesheet')
  expect(mySonic.sum(1, 2)).toBe(3);
});
