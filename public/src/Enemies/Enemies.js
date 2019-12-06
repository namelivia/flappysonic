import { Container, Sprite, SpriteSheet} from 'createjs'

export const SpriteSheetData = {
	"frames": {"regX": 0, "height": 52, "count": 2, "regY": 0, "width": 48},
	"animations": {"stay": [0, 1, "stay"]}
}

export default class Enemies extends Container {
	NUM_ENEMIES = 4
	enemies = [];
	constructor(spritesheet) {
		super()
		this.setup(spritesheet)
	}

	calculateFramerate() {
		Math.floor(Math.random() * 8)
	}

	calculateHole() {
		return Math.floor(
			(
				Math.random() * (this.NUM_ENEMIES + 1)
			) - 1
		)
	}

	initializeEnemy(enemyNumber, dataEnemy) {
		let newEnemy = new Sprite(dataEnemy, 'stay')
		newEnemy.framerate = this.calculateFramerate()
		newEnemy.x = 350
		newEnemy.y = ( 50 * enemyNumber ) - 8
		if (enemyNumber > this.hole){
			newEnemy.y += 100
		}
		this.addChild(newEnemy)
		return newEnemy
	}

	setup(spritesheet) {
		SpriteSheetData.images = [spritesheet]
		var dataEnemy = new SpriteSheet(SpriteSheetData);
		this.score = 0
		this.hole = this.calculateHole()
		for (var i = 0; i<this.NUM_ENEMIES; i++) {
			this.enemies[i] = this.initializeEnemy(i, dataEnemy)
		}
	}

	collision (sonic) {
		var collision = false;
		var i = 0;
		/*while (!collision && i <this.NUM_ENEMIES){
			var collision = ndgmr.checkPixelCollision(sonic,this.enemies[i]);
			i++;
		}*/
		return collision;
	}

	tick(event,state) {
		if (state === 0){
			this.hole = this.calculateHole()
			for (var i = 0;i<this.NUM_ENEMIES;i++){
				this.enemies[i].x = this.enemies[i].x-6;
				if (this.enemies[i].x < -60){
					this.enemies[i].x = 350;
					this.enemies[i].y = (50*i)-8;
					if (i > this.hole){
						this.enemies[i].y = this.enemies[i].y+100;
					}
				}
			}
			if (this.enemies[0].x == 20){
				this.score++;
			}
		}
	}
}
