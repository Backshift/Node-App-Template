const socket = io();

console.log('socket');

$(document).ready(()=>{
    console.log('doc ready')
    $('form').submit(() => {
        console.log('Submit')
        socket.emit('chat message', $('#msg').val());
        $('#msg').val('');
        return false;
    });

    socket.on('chat message', (msg) => {
        $('#messages').append($('<li>').text(msg));
    });

})