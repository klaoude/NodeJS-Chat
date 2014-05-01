var socket = io.connect('klaoude.kd.io:8080');
var msgtpl = $('#msgtpl').html();
$('#msgtpl').remove();
            
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
});

$('#form').submit(function(event){
    event.preventDefault();
    socket.emit('newmsg', {message : $('#message').val()} );
    $('#message').val('');
    $('#message').focus();
});

socket.on('newmsg', function(message) {
    $('#messages').prepend('<div class="message">' + Mustache.render(msgtpl, message) + '</div>');
});

socket.on('newusr', function(user) {
    $('#users').append(
        '<div class="user" id="user_' + user.id + '">' + 
            '<img src="' + user.avatar + '">' +
            '<div class="cursorblock">' +
                '<p>'+ user.username +'</p>' +
            '</div>' +
        '</div>'
    );
});

socket.on('disusr', function(user){
    $('#user_' + user.id).remove();
});