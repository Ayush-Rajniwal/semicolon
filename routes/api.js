var express = require('express');
var router = express.Router();
var config = require('../config');
const uid= require('uid');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(config.key);


const { createCanvas, loadImage } = require('canvas')

//Mongo DB 
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/test"

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

/* POST api/apikeygen  */
router.post('/apikeygen', function(req, res, next) {


  //match domain with reg expression and allow for localhost
  if(req.body.domain.match(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g) || req.body.domain == 'localhost'){
  
    //check if domain exist
    client.connect((err,db)=>{
      var flag=true;
      var collection = db.db("test").collection('user');
      collection.findOne({name:"Anurag"})
      .then((result)=>{
        for(var i=0;i<result.dokey.length;i++){
          if(result.dokey[i][0]===req.body.domain && flag){
            flag=false;
            res.status(406).send({msg:"Domain already exist🙅‍♂️"});
          }
        }
        if(flag){
          //if domain does not exist then update database
          collection.updateOne({name:"Anurag"},{$push:{dokey:[req.body.domain,uid("req.body.email".length)]}})
         .then(result=>res.redirect('/apikey'));   
        }
      })
    })  
}
  else
  res.status(406).send({msg:"Domain not valid"}); //return 406 unacceptable input
});


/* POST api/cct 
cct - creare client token
*/
router.post('/cct', function(req, res, next) {
console.log(req.body.h)
console.log(req.body.w)
let h=parseInt(req.body.h)
let w=parseInt(req.body.w);
const canvas = createCanvas(w,h)
const ctx = canvas.getContext('2d');

ctx.strokeStyle = 'rgba(0,0,0,0.5)';

if(req.useragent.isMobile){
  let target={
    x:Random(40,w-40),
    y:Random(40,h-40),
  }
  console.log('Mobile request');
  ctx.beginPath();
  ctx.arc(target.x,target.y, 40, 0, 2 * Math.PI);
  ctx.stroke(); 
  res.send({
    isMobile:true,
    ball:[Random(0,w),Random(0,h),Random(10,20)],
    bg:canvas.toDataURL(),
    metaData:cryptr.encrypt(target.x+'#'+target.y)
  });
}

else{



//horizontal
if(Math.round(Math.random())){

let a = Math.floor(Random(h/4,3*h/4));
let b = Math.floor(Random(h/4,3*h/4));
ctx.fillStyle = '#ffe354';
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(w,0);
ctx.lineTo(w, a);
ctx.lineTo(0, b);
ctx.stroke();
ctx.closePath();
ctx.fill();

ctx.fillStyle = '#7bc0f5';
ctx.beginPath();
ctx.moveTo(0, b);
ctx.lineTo(0,h);
ctx.lineTo(w, h);
ctx.lineTo(w, a);
ctx.stroke();
ctx.closePath();
ctx.fill();

}
//vertical
else{

let a = Math.floor(Random(w/4,3*w/4));
let b = Math.floor(Random(w/4,3*w/4));
ctx.fillStyle = '#ffe354';
ctx.beginPath();
ctx.moveTo(a, 0);
ctx.lineTo(b,h);
ctx.lineTo(0, h);
ctx.lineTo(0, 0);
ctx.stroke();
ctx.closePath();
ctx.fill();


ctx.fillStyle = '#7bc0f5';
ctx.beginPath();
ctx.moveTo(a, 0);
ctx.lineTo(w,0);
ctx.lineTo(w, h);
ctx.lineTo(b, h);
ctx.stroke();
ctx.closePath();
ctx.fill();



}

console.log(canvas.toDataURL())
res.send({msg:canvas.toDataURL()})
}
});



function Random(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports = router;
