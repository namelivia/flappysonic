var express = require("express");
var app = express();
var port = 60000;
var db;
app.set('views', __dirname + '/tpl');
app.use(express.static(__dirname + '/public'));
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});

//Database 
var MongoClient = require('mongodb').MongoClient;

//Sockets
var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);
io.sockets.on('connection', function (socket) {
    socket.on('send', function (data) {
        if (data.hiscore){
	  //Store data.hiscore and data.name on DB
	  MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
		  if(err) { return console.dir(err); }
		  var collection = db.collection('hiscores');
		  var newHiscore = {'hiscore' : data.hiscore, 'name' : data.name};	
 		  collection.insert(newHiscore,function(err, result) {});
		  var results = collection.find({}).sort({hiscore: -1}).limit(10).toArray(function(err, results){
		    io.sockets.emit('message', { hiscores: results});
		  });
		  var results2 = collection.find({}).sort([['_id', -1]]).limit(10).toArray(function(err, results2){
			  io.sockets.emit('message', {lastscores: results2});
		  });
	  });
        }
	if (data.getHiscores){
	  console.log('hiscores request');
	  MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
		  if(err) { return console.dir(err); }
		  var collection = db.collection('hiscores');
		  var results = collection.find({}).sort({hiscore: -1}).limit(10).toArray(function(err, results){
			  io.sockets.emit('message', {hiscores: results});
		  });
		  var results2 = collection.find({}).sort([['_id', -1]]).limit(10).toArray(function(err, results2){
			  io.sockets.emit('message', {lastscores: results2});
		  });
	  });
	}
    });
});

