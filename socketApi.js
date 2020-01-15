var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('A user connected '+socket.id);

    socket.on('move',(data)=>{
       console.log(data);
       if(data.x<=10){
          socket.disconnect(true)
       }
    })
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected '+socket.id);
    });

 });

module.exports = socketApi;