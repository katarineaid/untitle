let express = require('express');
let router = express.Router();

let success = require('../config/success.json');
let error = require('../config/error.json');
let progress = require('../config/progress.json');

router.post('/', function(req, res, next) {
  console.log('req.body', req.body)
  const params = {
    fio: req.body.fio,
    email: req.body.email,
    phone: req.body.phone
  }

  let sum = Math.random();
  if (sum % 2 === 0) {
    return res.json(success);
  } else if (sum % 3 === 0) {
    return res.json(error);
  }
  return res.json(progress);
});
router.get('/v1', function(req, res, next) {
  res.render('response', {title: 'Express'});
});

module.exports = router;
