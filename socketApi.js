var socket_io = require('socket.io');
var config = require('./config');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(config.key);

var io = socket_io();
var socketApi = {};

socketApi.io = io;

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('A user connected '+socket.id);

    socket.on('move',(data)=>{
       [x,y] = cryptr.decrypt(data.metaData,config.key).split('#');
   
       console.log(data);
       console.log(x,y);
       
      circle(data.x,data.y,x,y,data.r,40);
    })
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected '+socket.id);
    });

 });


 function circle(x1, y1, x2, y2,  r1,  r2) 
{ 
var distSq =  Math.sqrt((x1 - x2) * (x1 - x2) +  (y1 - y2) * (y1 - y2)); 
console.log("Distance "+distSq);


if (distSq <= r2) {
console.log("I am inside😀");
io.emit('vib');
}
} 
module.exports = socketApi;