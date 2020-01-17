var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/user')

/* POST api/apikeygen  */
router.post('/apikeygen', function(req, res, next) {

  //match domain with reg expression and allow for localhost
  if(req.body.domain.match(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g) || req.body.domain == 'localhost'){
    const user = new User({
      _id:new mongoose.Types.ObjectId(),
      name:'Ayush',
      pass:'xyazd'
    });

   // save the user
user.save(function(err,data) {
  if (err) throw err;
console.log(data);
  console.log('User created!');
});

  
}
  else
  res.status(400).send({msg:"Domain not valid"}); //return 400 bad request with message
});

module.exports = router;
