var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var morgan = require('morgan'); //logs

app.use(morgan('dev')); //request to server will use app morgan

app.use('/', function(req, res){
  res.send('hello');
});

app.listen(port);
console.log('Server running on port:' + port);
