let express = require('express');
let router = express.Router();

let success = require('../config/success.json');
let error = require('../config/error.json');
let progress = require('../config/progress.json');

router.post('/', function(req, res, next) {
  const params = {
    fio: req.body.fio,
    email: req.body.email,
    phone: req.body.phone
  }
  let sum = Math.floor(Math.random() * 100);
  if (sum % 2 === 0) {
    return res.json(progress);
  } else if (sum % 3 === 0) {
    return res.json(success);
  }
  return res.json(error);

});

module.exports = router;
