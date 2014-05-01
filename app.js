var app = require('express')();
var httpServer = require("http").createServer(app);
var io = require('socket.io').listen(httpServer);
var md5 = require('MD5');

app.get('/', function(req, res){
   res.sendfile(__dirname + '/index.html'); 
});

app.get('/css/', function(req, res){
   res.sendfile(__dirname + '/Css/style.css'); 
});

app.get('/js/cli', function(req, res){
   res.sendfile(__dirname + '/js/client.js'); 
});

app.get('/js/mus', function(req, res){
   res.sendfile(__dirname + '/js/mustache.js'); 
});

var users = {};
var messages = [];
var histori = 10;

io.sockets.on('connection', function(socket){
    var me = false;
    
    for(var i in users) {
        socket.emit('newusr', users[i]);
    }
    
    for(var j in messages) {
        socket.emit('newmsg', messages[j]);
    }

    
    socket.on('newmsg', function(message){
        message.user = me;
        date = new Date();
        message.h = date.getHours();
        message.m = date.getMinutes();
        messages.push(message);
        if(messages.length > histori)
            messages.shift();
        io.sockets.emit('newmsg', message);
    });
    
    socket.on('login', function(user){
        me = user;
        me.id = user.mail.replace('@', '-').replace('.', '-');
        me.avatar = 'https://gravatar.com/avatar/' + md5(user.mail) + '?s=50';
        socket.emit('logged');
        users[me.id] = me;
        io.sockets.emit('newusr', me);
    });
    
    socket.on('disconnect', function() {
        if(!me)
            return false;
        delete users[me.id];
        io.sockets.emit('disusr', me);
    });
});

httpServer.listen(8080);