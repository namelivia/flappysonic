import Scenario from './Scenario/Scenario'
import Sonic from './Sonic/Sonic'
import Enemies from './Enemies/Enemies'
import Score from './Score/Score'

export default class Level {

	tick(event) {
		//updates all entities
		player.tick(event,state)
		scenario.tick(event,state)
		enemies.tick(event,state)

		//checks every update if 
		if (state == 0){ //sonic alive
			if (enemies.collision(player.sonic) || player.sonic.y < -60 || player.sonic.y > 280){
				doJumpFastButton.destroy()
				player.die(preload.getResult("sonicHit"))
				state = 1
				ticks = 0
				music.stop()
				Sound.play("miss")
				//socket.emit('send', { hiscore: currentScore, name: playerName})
			}
		}

		//checks every update if 
		if (state == 1){ //sonic dead
			ticks++
			if (ticks == 100){
				messageField.text = "Click to restart"
				stage.addChild(messageField)
				restartFastButton = new FastButton(canvas, () => {
					restart()
				})
			}
		}

		//checks every update if 
		stage.update(event)
		
		newScore = enemies.score
		if (newScore != currentScore){
			currentScore = newScore
			Sound.play("ring")
			score.update(newScore)
		}
	}

	start(stage, preload) {
		//sonic starts alive
		this.state = 0

		//cleans the stage
		stage.removeAllChildren()
		stage.update()

		//loads all entities and adds them to the stage
		this.scenario = new Scenario(
			preload.getResult("clouds"), preload.getResult("floor")
		)
		this.player = new Sonic(preload.getResult("sonic"))
		this.enemies = new Enemies(preload.getResult("enemy"))      
		this.score = new Score(preload.getResult("score"))  
		stage.addChild(scenario,player,enemies,score)

		//starts playing the level music
		music = Sound.play("music")

		//initializes the score (not sure why score is in enemies)
		this.currentScore = enemies.score

		//what is this for?
		if (restartFastButton){
			restartFastButton.destroy()
		}

		//attaches the click action to the player jump
		doJumpFastButton = new FastButton(canvas, player.doJump)

		//attaches the update action
		if (!Ticker.hasEventListener("tick")) { 
			Ticker.addEventListener("tick", tick)
		}                                               
	}
}
