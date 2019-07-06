var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { title: 'Express' });
});

router.use('/authentication', require('./authenticaton'));
router.use('/private', require('./private'));
router.use('/public', require('./public'));

module.exports = router;
