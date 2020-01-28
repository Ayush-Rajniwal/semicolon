var socket_io = require('socket.io');
var config = require('./config');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(config.key);
const fs = require('fs');


//Mongo DB 
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/test"

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });




var io = socket_io();
var socketApi = {};

socketApi.io = io;

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
   console.log('A user connected ' + socket.id);

   socket.on('move', (data) => {
      [x, y] = cryptr.decrypt(data.metaData, config.key).split('#');
      circle(data.x, data.y, x, y, data.r, 40, socket.id);
   });


   socket.on('save', (data) => {
      socket.disconnect(true);     
      [tx,ty] = cryptr.decrypt(data.metaData, config.key).split('#');
      delete data.metaData;
      data.tx = parseInt(tx);
      data.ty= parseInt(ty);
      client.connect((err,db)=>{
         var collection = db.db("test").collection('temp');
         collection.insertOne(data,(err,res)=>{
            console.log(res);
         })
      })
     
   })

   socket.on('disconnect', function () {
      console.log('A user disconnected ' + socket.id);
   });
   
});


function circle(x1, y1, x2, y2, r1, r2, id) {
   var distSq = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
   console.log("Distance " + distSq);


   if (distSq <= r2) {
      console.log("I am inside😀");
      console.log("------------------------------");
     io.to(id).emit('vib');
   }
 
}
module.exports = socketApi;