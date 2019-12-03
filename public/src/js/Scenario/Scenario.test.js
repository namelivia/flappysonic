import Scenario from './Scenario'

test('adds 1 + 2 to equal 3', () => {
  const myScenario = new Scenario('spritesheet')
  expect(myScenario.sum(1, 2)).toBe(3);
});
