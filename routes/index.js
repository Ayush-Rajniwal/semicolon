var express = require('express');
var router = express.Router();

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
  res.render('apikey');
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