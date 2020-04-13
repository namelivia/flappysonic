import Socket from '../Socket/Socket'
import Game from 'flappysonic-client'

export default class Page {
    setName() {
        let newName = document.getElementById('name').value
        if (newName.length === 0) {
            document.getElementById('noName').style.display = 'block'
            return false
        } else {
            this.playerName = newName
            return true
        }
    }

    updateScoreTable(data, scoreTable) {
        var new_tbody = document.createElement('tbody')
        for (var i = 0; i < data.length; i++) {
            var row = new_tbody.insertRow(0)
            var name = row.insertCell(0)
            var score = row.insertCell(1)

            name.innerHTML = data[i].name
            score.innerHTML = data[i].hiscore
        }
        scoreTable.replaceChild(new_tbody, scoreTable.tBodies[0])
    }

    updateHiscores(data) {
        this.UpdateScoreTable(data, this.hiscoresTable)
    }

    updateLastscores(data) {
        this.UpdateScoreTable(data, this.lastscoresTable)
    }

    init() {
        this.canvas = document.getElementById('gameCanvas')
        this.hiscoresTable = document.getElementById('hiscoresTable')
        this.lastscoresTable = document.getElementById('lastscoresTable')
        var nameButton = document.getElementById('set')
        nameButton.onclick = () => {
            if (this.setName()) {
                document.getElementById('rooster').style.display = 'none'
                document.getElementById('leftContainer').style.display = 'block'
                document.getElementById('rightContainer').style.display =
                    'block'
                document.getElementById('centralContainer').style.display =
                    'block'
                var socket = new Socket(
                    this.player,
                    this.updateHiscores,
                    this.updateLastscores
                )
                var game = new Game(this.canvas, socket)
                game.init()
            }
        }
    }
}
