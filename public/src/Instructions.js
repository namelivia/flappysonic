import { Bitmap } from 'createjs'
export default class Instructions {
	constructor(stage, preload) {
		this.instructions = new Bitmap(
			preload.getResult("instructions")
		) 	
		this.instructions.x = 0
		this.instructions.y = 0
		stage.addChild(this.instructions)
		stage.update()
	}
}
