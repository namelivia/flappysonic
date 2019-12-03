import { Container, Sprite, SpriteSheet} from 'createjs'

export const SpriteSheetData = {
	//"images": [spritesheet],
	"frames": {"regX": 0, "height": 64, "count": 12, "regY": 0, "width": 64},
	"animations": {"up": [0, 2, "up"],
	"straight": [3, 5, "straight"],
	"down": [6, 8, "down"],
	"dead": [9, 11, "dead"]}
}

export const DyingSpriteSheetData = {
	//"images": [spritesheet],
	"frames": {"regX": 0, "height": 64, "count": 2, "regY": 0, "width": 48},
	"animations": {"dead": [0, 0, "dead"],
				   "hurt": [1, 1, "hurt"]}
}

export default class Sonic extends Container {
	constructor(spritesheet) {
		super()
		this.setup(spritesheet)
	}

	setup(spritesheet) {
		var dataSonic = new SpriteSheet(SpriteSheetData);
		this.sonic = new Sprite(dataSonic, "straight");
		this.sonic.framerate = 5;
		this.sonic.x = 50;
		this.sonic.y = 50;
		this.addChild(this.sonic);
		this.jump = 0;
	}

	tick(event, state) {
		this.sonic.y = this.sonic.y+10;
		this.sonic.y = this.sonic.y-this.jump;
		if (this.jump > 0){
			this.jump = this.jump-2;
			if (this.jump > 10){
				if (this.sonic.currentAnimation != "up") {
					this.sonic.gotoAndPlay("up");
				}
			} else {
				if (this.sonic.currentAnimation != "straight") {
					this.sonic.gotoAndPlay("straight");
				}
			}
		}
		else if (this.sonic.currentAnimation != "down") {
			this.sonic.gotoAndPlay("down");
		}
		if (state == 1){
			if(this.sonic.currentAnimation != "dead"){
				this.sonic.gotoAndPlay("dead");
			}
			this.sonic.x=this.sonic.x+6;
			this.sonicHit.y=this.sonicHit.y+15;
			this.sonicHit.x=this.sonicHit.x-3;
		}
	}

	doJump() {
		this.jump = 20;
	}

	die(spritesheet) {
		var dataSonicHit = SpriteSheet(DyingSpriteSheetData);
        this.sonicHit = Sprite(dataSonicHit, "hurt");
		this.sonicHit.x = this.sonic.x;
		this.sonicHit.y = this.sonic.y;
		this.addChild(this.sonicHit);
	}
}
