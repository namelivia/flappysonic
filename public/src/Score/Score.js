import { Container, Sprite, SpriteSheet} from 'createjs'

export const SpriteSheetData = {
	//"images": [spritesheet], TODO: This won't go in the constructor
	"frames": {"regX": 0, "height": 32, "count": 10, "regY": 0, "width": 16},
	"animations": {"zero": [0, 0, "zero"],
	"one" : [1, 1, "one"],
	"two": [2, 2, "two"],
	"three": [3, 3, "three"],
	"four": [4, 4, "four"],
	"five": [5, 5, "five"],
	"six": [6, 6, "six"],
	"seven": [7, 7, "seven"],
	"eight": [8, 8, "eight"],
	"nine": [9, 9, "nine"]}
}

export default class Score extends Container {
	constructor(spritesheet) {
		super()
		this.setup(spritesheet)
	}

	setup(spritesheet) {
		SpriteSheetData.images = [spritesheet]
		let spriteSheet = new SpriteSheet(SpriteSheetData);

		this.score1 = new Sprite(spriteSheet, "zero")
		this.score1.x = 282
		this.score1.y = 5

		this.score2 = new Sprite(spriteSheet, "zero")
		this.score2.x = 299
		this.score2.y = 5
		this.addChild(this.score1,this.score2)
  }

	update(score) {
		let numbers = ["zero","one","two","three","four","five","six","seven","eight","nine"]
		let first = Math.floor(score/10)
		let second = score%10
		this.score1.gotoAndPlay(numbers[first])
		this.score2.gotoAndPlay(numbers[second])
	}
}
