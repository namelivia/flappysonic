var canvas;
var stage;
var state = 0;

var player;
var scenario;
var enemies;
var music;
var currentScore;

var messageField;

var loadingInterval = 0;
var preload;

function init() {
	canvas = document.getElementById("gameCanvas");
	stage = new createjs.Stage(canvas);
	
	messageField = new createjs.Text("Loading", "bold 24px Helvetica", "#FFFFFF");
	messageField.maxWidth = 1000;
	messageField.textAlign = "center";
	messageField.x = canvas.width / 2;
	messageField.y = canvas.height / 2;
	stage.addChild(messageField);
	stage.update();

	var manifest = [
		{id:"floor", src:"img/background1.png"},
		{id:"clouds", src:"img/background2.png"},
		{id:"sonic", src:"img/sonic.png"},
		{id:"sonicHit", src:"img/sonicdeath.png"},
		{id:"enemy", src:"img/enemy.png"},
		{id:"score", src:"img/score.png"},
		{id:"miss", src:"snd/miss.ogg"},
		{id:"ring", src:"snd/ring.ogg"},
		{id:"music", src:"snd/music.ogg"}
	];

	preload = new createjs.LoadQueue();
	createjs.Sound.alternateExtensions = ["mp3"];
	preload.installPlugin(createjs.Sound);
	preload.addEventListener("complete", doneLoading);
	preload.addEventListener("progress", updateLoading);
	preload.loadManifest(manifest);
}

function stop() {
	if (preload != null) { preload.close(); }
	createjs.Sound.stop();
}

function updateLoading() {
	messageField.text = "Loading " + (preload.progress*100|0) + "%"
	stage.update();
}

function doneLoading(event) {
	clearInterval(loadingInterval);
	messageField.text = "Click to start";
	watchRestart();
}

function watchRestart() {
	canvas.onclick = handleClick;
	stage.addChild(messageField);
	stage.update();
}

function handleClick() {
	stage.removeChild(messageField);
	restart();
}

function restart() {
	stage.removeAllChildren();
	scenario = new Scenario(preload.getResult("clouds"),preload.getResult("floor"));
	player = new Sonic(preload.getResult("sonic"));
	enemies = new Enemies(preload.getResult("enemy"));      
	score = new Score(preload.getResult("score"));  
	stage.addChild(scenario,player,enemies,score);
	music = createjs.Sound.play("music");
	currentScore = enemies.score;

	canvas.onclick = doJump;

	if (!createjs.Ticker.hasEventListener("tick")) { 
		createjs.Ticker.addEventListener("tick", tick);
	}                                               
}

function doJump() {
	player.doJump();
}

function tick(event) {
	player.tick(event,state);
	scenario.tick(event,state);
	enemies.tick(event,state);
	if (state == 0){
		if (enemies.collision(player.sonic) || player.sonic.y < -60 || player.sonic.y > 280){
			canvas.onclick = null;
			player.die(preload.getResult("sonicHit"));
			state = 1;
			music.stop();
			createjs.Sound.play("miss");
		}
	}
	stage.update(event);
	
	newScore = enemies.score;
	if (newScore != currentScore){
		currentScore = newScore;
		createjs.Sound.play("ring");
		score.update(newScore);
	}
}
