(function (window) {

	function Enemies(spritesheet) {
		this.initialize(spritesheet);
	}

	var p = Enemies.prototype = new createjs.Container();

// constants:
	p.NUM_ENEMIES = 4;

// public properties:
	p.enemies = [];
	p.hole;
	p.score;

// constructor:
	p.Container_initialize = p.initialize;	//unique to avoid overiding base class

	p.initialize = function (spritesheet) {
		this.score = 0;
		this.Container_initialize();
		var dataEnemy= new createjs.SpriteSheet({
                        "images": [spritesheet],
                        "frames": {"regX": 0, "height": 52, "count": 2, "regY": 0, "width": 48},
                        "animations": {"stay": [0, 1, "stay"]}
                });
		this.hole = Math.floor((Math.random()*(this.NUM_ENEMIES+1))-1);
		for (var i = 0;i<this.NUM_ENEMIES;i++){
			this.enemies[i] = new createjs.Sprite(dataEnemy, "stay");
			this.enemies[i].framerate = Math.floor((Math.random()*8));
			this.enemies[i].x = 350;
			this.enemies[i].y = (50*i)-8;
			if (i > this.hole){
				this.enemies[i].y = this.enemies[i].y+100;
			}
			this.addChild(this.enemies[i]);
		}
	}

// public methods:
	p.tick = function (event,state) {
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

	p.collision = function (sonic){
		var collision = false;
		var i = 0;
		while (!collision && i <this.NUM_ENEMIES){
			var collision = ndgmr.checkPixelCollision(sonic,this.enemies[i]);
			i++;
		}
		return collision;
	}

	window.Enemies = Enemies;

}(window));
