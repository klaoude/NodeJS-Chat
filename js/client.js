var socket = io.connect('klaoude.kd.io:8080');
var msgtpl = $('#msgtpl').html();
var usrtpl = $('#usrtpl').html();
var sound = new buzz.sound('sound/pet.mp3');


$('#msgtpl').remove();
$('#usrtpl').remove();
            
$('#loginform').submit(function(event){
    event.preventDefault();
    socket.emit('login', {
        username : $('#username').val(),
        mail : $('#mail').val()
    });
});

socket.on('logged', function(){
    $('#login').fadeOut();
    $('#message').focus();
    socket.emit('newmsg', {message : "Je viens de me connecter au chat !!!"});
});

$('#form').submit(function(event){
    event.preventDefault();
    socket.emit('newmsg', {message : $('#message').val()} );
    $('#message').val('');
    $('#message').focus();
});

socket.on('newmsg', function(message) {
    $('#messages').prepend('<div class="message">' + Mustache.render(msgtpl, message) + '</div>');
    sound.play();
});

socket.on('newusr', function(user) {
    $('#users').append('<div class="user">' + Mustache.render(usrtpl, user) + '</div>');
});

socket.on('disusr', function(user){
    socket.emit('newmsg', {message : "Je viens de me deconnecter du chat !!!"});
    $('#user_' + user.id).remove();
});