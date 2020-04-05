import Sonic, { SpriteSheetData, HurtSpriteSheetData} from './Sonic'
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

beforeEach(() => {
  jest.clearAllMocks();
});

test('sprites are initialized when initializing sonic', () => {
  //spriteSheetConstructorMock.mockImplementation(() => 'spriteSheet') TODO I havent been able to do this
  const sonic = new Sonic('spritesheet')
  expect(mockedContainerConstructor).toHaveBeenCalledTimes(1);
  expect(mockedContainerConstructor).toHaveBeenCalledWith();
  expect(spriteSheetConstructorMock).toHaveBeenCalledTimes(1);
  expect(spriteSheetConstructorMock).toHaveBeenCalledWith(SpriteSheetData);
  expect(mockedSpriteConstructor).toHaveBeenCalledTimes(1);
  expect(mockedSpriteConstructor).toHaveBeenCalledWith({}, 'straight');
  expect(mockAddChild).toHaveBeenCalledTimes(1);
  expect(sonic.jump).toBe(0);
});

test('updating data while jumping up', () => {
  const sonic = new Sonic('spritesheet')
  sonic.sprite.x = 20
  sonic.sprite.y = 10
  sonic.jump = 16
  sonic.tick('event', 0) //TODO: Use a constant
  expect(sonic.sprite.x).toBe(20)
  expect(sonic.sprite.y).toBe(4)
  expect(sonic.jump).toBe(14)
  expect(gotoAndPlayMock).toHaveBeenCalledTimes(1)
  expect(gotoAndPlayMock).toHaveBeenCalledWith('up')
})

test('updating data while going straight', () => {
  const sonic = new Sonic('spritesheet')
  sonic.sprite.x = 20
  sonic.sprite.y = 10
  sonic.jump = 2
  sonic.tick('event', 0) //TODO: Use a constant
  expect(sonic.sprite.x).toBe(20)
  expect(sonic.sprite.y).toBe(18)
  expect(sonic.jump).toBe(0)
  expect(gotoAndPlayMock).toHaveBeenCalledTimes(1)
  expect(gotoAndPlayMock).toHaveBeenCalledWith('straight')
})

test('updating data while going down', () => {
  const sonic = new Sonic('spritesheet')
  sonic.sprite.x = 20
  sonic.sprite.y = 10
  sonic.jump = 0
  sonic.tick('event', 0) //TODO: Use a constant
  expect(sonic.sprite.x).toBe(20)
  expect(sonic.sprite.y).toBe(20)
  expect(sonic.jump).toBe(0)
  expect(gotoAndPlayMock).toHaveBeenCalledTimes(1)
  expect(gotoAndPlayMock).toHaveBeenCalledWith('down')
})

test('updating data while dead', () => {
  const sonic = new Sonic('spritesheet')
  sonic.die('spritesheet')
  sonic.sprite.x = 20
  sonic.sprite.y = 10
  sonic.jump = 0
  sonic.tick('event', 1) //TODO: Use a constant
  expect(sonic.sprite.x).toBe(26)
  expect(sonic.sprite.y).toBe(10)
  expect(sonic.jump).toBe(0)
  expect(gotoAndPlayMock).toHaveBeenCalledTimes(1)
  expect(gotoAndPlayMock).toHaveBeenCalledWith('dead')
  expect(spriteSheetConstructorMock).toHaveBeenCalledTimes(2)
  expect(spriteSheetConstructorMock).toHaveBeenCalledWith(HurtSpriteSheetData)
  expect(mockedSpriteConstructor).toHaveBeenCalledTimes(2);
  expect(mockedSpriteConstructor).toHaveBeenCalledWith({}, 'hurt')
  expect(mockAddChild).toHaveBeenCalledTimes(2);
})

test('jumping resets the jump to 20', () => {
  const sonic = new Sonic('spritesheet')
  sonic.jump = 5
  sonic.doJump()
  expect(sonic.jump).toBe(20);
});
