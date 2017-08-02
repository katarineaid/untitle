let express = require('express');
let router = express.Router();

let success = require('../config/success.json');
let error = require('../config/error.json');
let progress = require('../config/progress.json');

let sum=0;
router.post('/', function(req, res, next) {
  const params = {
    fio: req.body.fio,
    email: req.body.email,
    phone: req.body.phone
  }

  sum=sum+1
  if (sum%2 === 0) {
    res.json(success);
  }else if(sum%3 === 0){
    res.json(error);
  }
  res.json(progress);
});
router.get('/v1', function(req, res, next) {
  res.render('response', { title: 'Express' });
});

module.exports = router;
