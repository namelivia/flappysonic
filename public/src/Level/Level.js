import { Stage, Ticker, Sound } from 'createjs'
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
				console.log('cant jump')
				this.canvas.removeEventListener('click', evt => this.jumpOnClick(event))
				this.player.die(this.preloader.getResult('sonicHit'))
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
				console.log('can restart')
				this.canvas.addEventListener('click', evt => this.restartOnClick(event))
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

	jumpOnClick(event) {
		this.player.doJump()
	}

	restartOnClick(event) {
		this.start(this.canvas, this.preloader)
	}

	start(canvas, preloader) {
		this.canvas = canvas
		this.stage = new Stage(this.canvas)
		this.preloader = preloader
		this.state = 0
		this.scenario = new Scenario(
			this.preloader.getResult('clouds'),
			this.preloader.getResult('floor')
		)
		this.player = new Sonic(this.preloader.getResult('sonic'))
		this.enemies = new Enemies(this.preloader.getResult('enemy'))      
		this.score = new Score(this.preloader.getResult('score'))  
		this.stage.addChild(this.scenario, this.player, this.enemies, this.score)

		this.music = Sound.play('music')
		this.currentScore = this.enemies.score

		console.log('cant restart')
		this.canvas.removeEventListener('click', evt => this.restartOnClick(event))
		console.log('can jump')
		this.canvas.addEventListener('click', evt => this.jumpOnClick(event))
		if (!Ticker.hasEventListener('tick')) { 
			Ticker.addEventListener('tick', evt => this.tick(evt))
		}
	}
}
