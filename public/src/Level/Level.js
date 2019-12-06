import { Ticker, Sound } from 'createjs'
import Scenario from '../Scenario/Scenario'
import Sonic from '../Sonic/Sonic'
import Enemies from '../Enemies/Enemies'
import Score from '../Score/Score'

export default class Level {

	tick(event) {
		//updates all entities
		this.player.tick(event, this.state)
		this.scenario.tick(event, this.state)
		this.enemies.tick(event, this.state)

		//checks every update if 
		if (this.state == 0){
			if (this.enemies.collision(this.player.sprite) ||
				this.player.sprite.y < -60 || this.player.sprite.y > 280
			){
				//doJumpFastButton.destroy()
				this.player.die(this.preload.getResult('sonicHit'))
				this.state = 1
				this.ticks = 0
				this.music.stop()
				Sound.play('miss')
				//socket.emit('send', { hiscore: currentScore, name: playerName})
			}
		}

		//checks every update if 
		if (this.state == 1){
			this.ticks++
			if (this.ticks == 100) {
				//this.messageField.text = "Click to restart"
				//this.stage.addChild(messageField)
				/*restartFastButton = new FastButton(canvas, () => {
					restart()
				})*/
			}
		}

		//checks every update if 
		this.stage.update(event)
		
		/*newScore = enemies.score
		if (newScore != currentScore){
			currentScore = newScore
			Sound.play("ring")
			score.update(newScore)
		}*/
	}

	start(canvas, preload) {
		this.stage = new Stage(canvas)
		this.preload = preload
		//sonic starts alive
		this.state = 0

		//loads all entities and adds them to the stage
		this.scenario = new Scenario(
			this.preload.getResult('clouds'),
			this.preload.getResult('floor')
		)
		this.player = new Sonic(this.preload.getResult('sonic'))
		this.enemies = new Enemies(this.preload.getResult('enemy'))      
		this.score = new Score(this.preload.getResult('score'))  
		stage.addChild(this.scenario, this.player, this.enemies, this.score)

		//starts playing the level music
		this.music = Sound.play('music')

		//initializes the score (not sure why score is in enemies)
		this.currentScore = this.enemies.score

		//what is this for? Probably I will not use this
		/*if (restartFastButton){
			restartFastButton.destroy()
		}*/

		//attaches the click action to the player jump
		//doJumpFastButton = new FastButton(canvas, player.doJump)

		//attaches the update action
		if (!Ticker.hasEventListener('tick')) { 
			Ticker.addEventListener('tick', evt => this.tick(evt));
		}
	}
}
