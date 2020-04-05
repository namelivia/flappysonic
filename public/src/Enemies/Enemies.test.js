import Enemies, { SpriteSheetData } from './Enemies'
import {
	Container,
	Sprite,
	SpriteSheet,
	mockAddChild,
	mockedContainerConstructor,
	mockedSpriteConstructor,
	spriteSheetConstructorMock
} from 'createjs'

test('sprites are initialized when initializing the enemies', () => {
  //spriteSheetConstructorMock.mockImplementation(() => 'spriteSheet') TODO I havent been able to do this
  const enemies = new Enemies('spritesheet')
  expect(mockedContainerConstructor).toHaveBeenCalledTimes(1);
  expect(mockedContainerConstructor).toHaveBeenCalledWith();
  expect(spriteSheetConstructorMock).toHaveBeenCalledTimes(1);
  expect(spriteSheetConstructorMock).toHaveBeenCalledWith(SpriteSheetData);
  expect(mockedSpriteConstructor).toHaveBeenCalledTimes(4);
  expect(mockedSpriteConstructor).toHaveBeenCalledWith({}, 'stay');
  expect(mockAddChild).toHaveBeenCalledTimes(4);
});

//TODO: There are tests missing here!
