var http = require("http");
var app = require("express")();

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

httpServer = http.createServer(function(req, res){
    console.log("Newuser");
});

httpServer.listen(8080);

var io = require("socket.io").listen(httpServer);