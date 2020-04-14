import io from 'socket.io-client'
export default class Socket {
    constructor(playerName, onHiscores, onLastScores) {
        this.playerName = playerName
        this.socket = io.connect('https://flappysonic.namelivia.com')

        this.socket.on('message', (data) => {
            console.log(data)
            if (data.hiscores) {
                onHiscores(data.hiscores)
            }

            if (data.lastscores) {
                onLastScores(data.lastscores)
            }
        })
    }

    sendHiscore(score) {
        console.log('send hiscores')
        this.socket.emit('send', { hiscore: score, name: this.playerName })
    }

    queryHiscores() {
        console.log('query hiscores')
        this.socket.emit('send', { getHiscores: 'data' })
    }
}
