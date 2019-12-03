import Sonic, { SpriteSheetData } from './Sonic'
import {
	Container,
	Sprite,
	SpriteSheet,
	mockAddChild,
	mockedContainerConstructor,
	mockedSpriteConstructor,
	spriteSheetConstructorMock
} from 'createjs'

test('sprites are initialized when initializing sonic', () => {
  //spriteSheetConstructorMock.mockImplementation(() => 'spriteSheet') TODO I havent been able to do this
  const mySonic = new Sonic('spritesheet')
  expect(mockedContainerConstructor).toHaveBeenCalledTimes(1);
  expect(mockedContainerConstructor).toHaveBeenCalledWith();
  expect(spriteSheetConstructorMock).toHaveBeenCalledTimes(1);
  expect(spriteSheetConstructorMock).toHaveBeenCalledWith(SpriteSheetData);
  expect(mockedSpriteConstructor).toHaveBeenCalledTimes(1);
  expect(mockedSpriteConstructor).toHaveBeenCalledWith({}, 'straight');
  expect(mockAddChild).toHaveBeenCalledTimes(1);
});

test('jumping resets the jump to 20', () => {
  const mySonic = new Sonic('spritesheet')
  mySonic.jump = 5
  mySonic.doJump()
  expect(mySonic.jump).toBe(20);
});
