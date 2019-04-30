
var sequelize = require('sequelize');
var models = require('./models/');
var express = require('express');
var app = express();
var routes = require('./routes/index');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine','ejs');
app.use('/', routes);

// app.use(passport.initialize());
// app.use(passport.session());


var port = 3000;
app.set('port', port);

var db = require('./models');
db.sequelize.sync().then(function(){
  console.log('db synced');
  app.listen(port, function() {
    console.log('Express server listening on port ' );
  });
})
.catch((err) =>{
  console.log(err);
})