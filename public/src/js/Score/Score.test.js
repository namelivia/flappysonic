import Score, { SpriteSheetData } from './Score'
import {
	Container,
	Sprite,
	SpriteSheet,
	mockAddChild,
	mockedContainerConstructor,
	mockedSpriteConstructor,
	spriteSheetConstructorMock,
	gotoAndPlayMock
} from 'createjs'
 

test('sprites are initialized when initializing the score', () => {
  //spriteSheetConstructorMock.mockImplementation(() => 'spriteSheet') TODO I havent been able to do this
  const myScore = new Score('spritesheet')
  expect(mockedContainerConstructor).toHaveBeenCalledTimes(1);
  expect(mockedContainerConstructor).toHaveBeenCalledWith();
  expect(spriteSheetConstructorMock).toHaveBeenCalledTimes(1);
  expect(spriteSheetConstructorMock).toHaveBeenCalledWith(SpriteSheetData);
  expect(mockedSpriteConstructor).toHaveBeenCalledTimes(2);
  expect(mockedSpriteConstructor).toHaveBeenCalledWith({}, 'zero');
  expect(mockAddChild).toHaveBeenCalledTimes(1);
});

test('test rendering a score number', () => {
  const myScore = new Score('spritesheet')
  myScore.update(23)
  expect(gotoAndPlayMock).toHaveBeenCalledTimes(2);
  expect(gotoAndPlayMock).toHaveBeenCalledWith('two');
  expect(gotoAndPlayMock).toHaveBeenCalledWith('three');
});
