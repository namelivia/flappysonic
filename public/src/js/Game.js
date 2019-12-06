import { Stage, Sound, Ticker, Bitmap, Text} from 'createjs'
import Preloader from './Preloader'
import LoadingText from './LoadingText'
import Instructions from './Instructions'
import Level from './Level'

export default class Game {

	stop() {
		if (preload != null) { preload.close() }
		Sound.stop()
	}

	doneLoading() {
		//TODO:what is this for?
		//clearInterval(loadingInterval)
		
		//Probably I won't use fastclick anymore
		/*this.handleClickFastButton = new FastButton(canvas, () => {
			this.handleClickFastButton.destroy()
			restart()
		})*/
		canvas.onClick = () => {
			this.restart()
		}
	}

	restart() {
		let level = new Level()
		level.start(this.stage, this.preloader)
	}

	ValidateForm(){
		let newName = document.getElementById("name")
		if (newName == ""){
			document.getElementById("noName").style.display = "block"
			return false
		} else {
			this.playerName = newName
			return true
		}
	}

	UpdateHiscores(data){
		var new_tbody = document.createElement('tbody')
		for (i = 0; i < data.length; i++) {
			var row = new_tbody.insertRow(0)
			var name = row.insertCell(0)
			var score = row.insertCell(1)

			name.innerHTML = data[i].name
			score.innerHTML = data[i].hiscore
		}
		hiscoresTable.replaceChild(new_tbody,hiscoresTable.tBodies[0])
	}

	UpdateLastscores(data){
		var new_tbody = document.createElement('tbody')
		for (i = 0; i < data.length; i++) {
			var row = new_tbody.insertRow(0)
			var name = row.insertCell(0)
			var score = row.insertCell(1)

			name.innerHTML = data[i].name
			score.innerHTML = data[i].hiscore
		}
		lastscoresTable.replaceChild(new_tbody,lastscoresTable.tBodies[0])
	}

	init() {

		console.log('The game is starting')
	//socket = io.connect('https://flappysonic.namelivia.com')
		var canvas = document.getElementById("gameCanvas")
		var hiscoresTable = document.getElementById("hiscoresTable")
		var lastscoresTable = document.getElementById("lastscoresTable")
		
		//LoadingStage
		this.stage = new Stage(canvas)
		var loadingText = new LoadingText(this.stage, canvas)

		//When player has written its name, show the game
		var nameButton = document.getElementById("set")
		nameButton.onclick = () => {
			if (this.ValidateForm()){
				document.getElementById("rooster").style.display = "none"
				document.getElementById("leftContainer").style.display = "block"
				document.getElementById("rightContainer").style.display = "block"
				document.getElementById("centralContainer").style.display = "block"
				//socket.emit('send', { getHiscores:"data"})
			}
		}

		//Process server responses
		/*socket.on('message', (data) => {
				if(data.hiscores){
				UpdateHiscores(data.hiscores.reverse())
			}
				if(data.lastscores){
				UpdateLastscores(data.lastscores.reverse())
			}
		})*/

		//starts preloading
		this.preloader = new Preloader(
			() => loadingText.update(this.preloader.getProgress(), this.stage),
			() => {
				this.restart()
				/*new Instructions(this.stage, this.preloader),
				canvas.onClick = () => {
					this.restart()
				}*/
			}
		)
		this.preloader.load()
	}
}
