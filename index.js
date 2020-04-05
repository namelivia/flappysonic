var express = require('express');
	mongoose = require('mongoose'),
	Hiscore = require('./models/hiscores.js'),
	app = express();
	port = 60000;

app.set('views', __dirname + '/tpl');
app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/flappysonic-client/dist/'));
//TODO: Fix favicon!
//app.use(express.favicon(__dirname + '/static/favicon.ico'));
app.set('view engine', 'pug');
app.engine('pug', require('pug').__express);
app.get('/', function(req, res){
    res.render('page');
});

var io = require('socket.io').listen(app.listen(port));
console.log('Listening on port ' + port);
io.sockets.on('connection', function (socket) {
	socket.on('send', function (data) {
		//Recieving a new hiscore
		if (data.hiscore) {
			mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
				() => {
					console.log('Connected to Database');
					var newHiscore = new Hiscore({
						hiscore: data.hiscore,
						name: data.name,
					});

					newHiscore.save(function(err) {
						if(!err) {
							console.log('Hiscore saved');
						} else {
							console.log('ERROR: ' + err);
						}
					});
				},
				err => {
					console.log('ERROR: connecting to Database. ' + err);
				});
			}
		
		//Retrieve all hiscores
		if (data.getHiscores) {
			console.log('Hiscores request');
			mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
				() => {
					console.log('Connected to Database');
					//Best scores
					Hiscore.find().sort({hiscore:-1}).limit(10).exec(function(err, results) {
						if(!err) {
							io.sockets.emit('message', {hiscores: results});
						} else {
							console.log('ERROR: ' + err);
						}

					//Last scores
					Hiscore.find().sort([['_id', -1]]).limit(10).exec(function(err, results2) {
						if(!err) {
							io.sockets.emit('message', {lastscores: results2});
						} else {
							console.log('ERROR: ' + err);
						}

					});
				},
				err => {
					console.log('ERROR: connecting to Database. ' + err);
				});
			});
		}
	});
});

