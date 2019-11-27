import createjs from 'createjs'
export default class Score extends createjs.Container {
	constructor() {
		super()
		this.setup()
	}

	setup() {
		this.score1 = new createjs.Sprite(dataScore, "zero")
		this.score1.x = 282
		this.score1.y = 5

		this.score2 = new createjs.Sprite(dataScore, "zero")
		this.score2.x = 299
		this.score2.y = 5
		this.addChild(this.score1,this.score2)
  }

	sum = (a, b) => (this.text + a + b)
}
exports.Score = Score
