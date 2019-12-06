import { Text } from 'createjs'

export default class LoadingText {
	constructor(stage, canvas) {
		this.messageField = new Text("Loading", "bold 24px Helvetica", "#FFFFFF")
		this.messageField.maxWidth = 1000
		this.messageField.textAlign = "center"
		this.messageField.x = canvas.width / 2
		this.messageField.y = canvas.height / 2
		stage.addChild(this.messageField)
		stage.update()
	}

	update(progress, stage) {
		this.messageField.text = "Loading " +
			(progress*100|0) + "%"
		stage.update()
	}
}
