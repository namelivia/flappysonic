var express = require("express");
var app = express();
var port = 60000;
var http = require('http');

app.set('port', 60000);
app.set('views', __dirname + '/tpl');
app.use(express.static(__dirname + '/public'));
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
