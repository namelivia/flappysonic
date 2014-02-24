(function (window) {

	function Score(spritesheet) {
		this.initialize(spritesheet);
	}

	var p = Score.prototype = new createjs.Container();

// constants:

// public properties:
	p.score1;
	p.score2;

// constructor:
	p.Container_initialize = p.initialize;	//unique to avoid overiding base class

	p.initialize = function (spritesheet) {
		this.Container_initialize();
		var dataScore= new createjs.SpriteSheet({
                        "images": [spritesheet],
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
                });
		this.score1 = new createjs.Sprite(dataScore,"zero");
		this.score1.x = 282;
		this.score1.y = 5;
		this.score2 = new createjs.Sprite(dataScore, "zero");
		this.score2.x = 299;
		this.score2.y = 5;
		this.addChild(this.score1,this.score2);
	}

// public methods:
	p.update = function (score) {
		numbers = ["zero","one","two","three","four","five","six","seven","eight","nine"]
		first = score/10;
		second = score%10;
		this.score1.gotoAndPlay(numbers[first]);
		this.score2.gotoAndPlay(numbers[second]);
	}

	window.Score = Score;

}(window));
