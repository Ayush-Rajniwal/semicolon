var socket_io = require('socket.io');
var config = require('./config');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(config.key);
const fs = require('fs');

let converter = require('json-2-csv');

let schemaCSV={
   xy : [],
   tx : 0,
    ty : 0,
    success : [],
    bu : 1
}

fs.readFile('./data.csv', 'utf8', function (err, contents) {
   converter.csv2json(contents, (err, res) => {
      out = res;
      console.log(out);

   })
});


var io = socket_io();
var socketApi = {};

socketApi.io = io;

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
   console.log('A user connected ' + socket.id);

   socket.on('move', (data) => {
      [x, y] = cryptr.decrypt(data.metaData, config.key).split('#');

      console.log(x, y);

      circle(data.x, data.y, x, y, data.r, 40, socket.id);
   })

   socket.on('disconnect', function () {
      console.log('A user disconnected ' + socket.id);
   });


   //Saving data to file - This is only for collecting data, and should be removed later.
   socket.on('save', () => {
      socket.disconnect(true);
      out.push(schemaCSV);
      converter.json2csv(
         out,
         (err, res) => {
            if (err)
               console.log(err)
            console.log(res);
            fs.writeFile('data.csv', res, () => {
               console.log("File written");
               schemaCSV = {
                  xy: [],
                  tx: 0,
                  ty: 0,
                  success: [],
                  bu: 1
               }

            })
         }
      )

   })
});


function circle(x1, y1, x2, y2, r1, r2, id) {
   var distSq = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
   console.log("Distance " + distSq);


   if (distSq <= r2) {
      console.log("I am inside😀");

      console.log(x1, y1, x2, y2, r1, r2, id);
      console.log("------------------------------");

      io.to(id).emit('vib');


      schemaCSV.xy.push([parseInt(x1), parseInt(y1)]);
      schemaCSV.tx = parseInt(x2);
      schemaCSV.ty = parseInt(y2);
      schemaCSV.success.push(1);
   }
   else {

      schemaCSV.xy.push([parseInt(x1), parseInt(y1)]);
      schemaCSV.tx = parseInt(x2);
      schemaCSV.ty = parseInt(y2);
      schemaCSV.success.push(0);

   }
}
module.exports = socketApi;