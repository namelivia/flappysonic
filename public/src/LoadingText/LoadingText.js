import { Text } from 'createjs'

export default class LoadingText {
	constructor(stage, canvas) {
		this.message = new Text("Loading", "bold 24px Helvetica", "#FFFFFF")
		this.message.maxWidth = 1000
		this.message.textAlign = "center"
		this.message.x = canvas.width / 2
		this.message.y = canvas.height / 2
		stage.addChild(this.message)
		stage.update()
	}

	update(progress, stage) {
		this.message.text = "Loading " +
			(progress*100|0) + "%"
		stage.update()
	}
}
