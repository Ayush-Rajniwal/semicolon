var express = require('express');
var router = express.Router();

//Mongo DB 
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/test"

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET documentation page. */
router.get('/documentation', function(req, res, next) {
  res.render('documentation');
});

/* GET apikey page. */
router.get('/apikey', function(req, res, next) {
  client.connect((err,db)=>{
    var collection = db.db("test").collection('user');
    collection.findOne({name:"Anurag"})
    .then((result)=>{
      console.log(result);
     res.render('apikey',{data:result})
    })
  })
});

/* GET login page. */
router.get('/login', function(req, res, next) {

  res.render('login');
});


/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

module.exports = router;