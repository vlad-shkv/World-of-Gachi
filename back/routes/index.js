var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/data', function(req, res, next) {
  const data = {
    name: "sdfjasdfka",
    age: "658345345345",
  }
  res.json(data);
});

module.exports = router;
