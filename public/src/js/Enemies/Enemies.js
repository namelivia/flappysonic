import { Container, Sprite, SpriteSheet} from 'createjs'
export default class Enemies extends Container {
	NUM_ENEMIES = 4
	enemies = [];
	constructor(spritesheet) {
		super()
		this.setup(spritesheet)
	}

	setup(spritesheet) {
		this.score = 0;
		var dataEnemy= new SpriteSheet({
        	"images": [spritesheet],
            "frames": {"regX": 0, "height": 52, "count": 2, "regY": 0, "width": 48},
            "animations": {"stay": [0, 1, "stay"]}
        });
		this.hole = Math.floor((Math.random()*(this.NUM_ENEMIES+1))-1);
		for (var i = 0;i<this.NUM_ENEMIES;i++){
			this.enemies[i] = new Sprite(dataEnemy, "stay");
			this.enemies[i].framerate = Math.floor((Math.random()*8));
			this.enemies[i].x = 350;
			this.enemies[i].y = (50*i)-8;
			if (i > this.hole){
				this.enemies[i].y = this.enemies[i].y+100;
			}
			this.addChild(this.enemies[i]);
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
		if (state == 0){
			this.hole = Math.floor((Math.random()*(this.NUM_ENEMIES+1))-1);
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

	sum = (a, b) => (a + b)
}
