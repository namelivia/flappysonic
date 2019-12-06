import { Bitmap } from 'createjs'
export default class Instructions {
	constructor(stage, preload) {
		this.image = new Bitmap(
			preload.getResult('instructions')
		) 	
		this.image.x = 0
		this.image.y = 0
		stage.addChild(this.image)
		stage.update()
	}
}
