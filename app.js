var app = require('express')();
var httpServer = require("http").createServer(app);
var io = require('socket.io').listen(httpServer);
var md5 = require('MD5');

app.get('/', function(req, res){
   res.sendfile(__dirname + '/index.html'); 
});

io.sockets.on('connection', function(socket){
    var me;
    
    socket.on('login', function(user){
        console.log(user);
        me = user;
        me.id = user.mail.replace('@', '-').replace('.', '-');
        me.avatar = 'https://gravatar.com/avatar' + md5(user.mail) + '?s=50';
        socket.emit('newusr');
    });
});

httpServer.listen(8080);