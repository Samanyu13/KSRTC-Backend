var express = require('express');
const bcrypt = require('bcrypt');
const methods = require('../methods')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { title: 'Express' });
});


router.post('/register', (req, res) => {
  const info = {};
  const final = {};

  var password = Math.random().toString(36).substr(2, 8);
  console.log(password);
  let hash = bcrypt.hashSync(password, 10);

  info.employee_code = req.body.data.employee_code;
  info.password = hash;

  final.public = req.body.data;
  final.private = info;

  methods.Employee.addEmployee(final)
    .then((model) => {
      res.json(model);
    })
    .catch((err) => {
      res.json({
        status: 'error',
        error: err,
      });
    });
});

router.post('/login', (req, res) => {
  const info = {};

  info.password = req.body.data.password;
  info.username = req.body.data.username;

  methods.Employee.checkForEmployee(info)
    .then((model) => {
      res.json(model);
    })
    .catch((err) => {
      res.json({
        status: 'error',
        error: err,
      });
    });
});


module.exports = router;
