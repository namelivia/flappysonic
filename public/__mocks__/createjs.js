export const mockAddChild = jest.fn();
export const mockedContainerConstructor = jest.fn();
export const mockedSpriteConstructor = jest.fn();
export const spriteSheetConstructorMock = jest.fn();
export const gotoAndPlayMock = jest.fn();
export class Container {
	constructor() {
		return mockedContainerConstructor()
	}
	addChild = mockAddChild
}
export class Sprite {
	constructor(data, animation) {
		return mockedSpriteConstructor(data, animation)
	}
	currentAnimation = 'currentAnimation'
	gotoAndPlay = gotoAndPlayMock
}
export class SpriteSheet {
	constructor(data) {
		return spriteSheetConstructorMock(data)
	}
}
export class Bitmap{
}
