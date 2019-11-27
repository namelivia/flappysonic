import Score from './Score'

test('adds 1 + 2 to equal 3', () => {
	const myScore = new Score()
  expect(myScore.sum(1, 2)).toBe('Result 12');
});
