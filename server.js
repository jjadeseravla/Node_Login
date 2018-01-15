var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var cookieParser = require('cookie-parser');
var session = require('express-session'); // brings in modules so we can use them

var morgan = require('morgan'); //logs

app.use(morgan('dev')); //request to server will use app morgan
app.use(cookieParser()); //sets request.cookies variable
app.use(session({secret: 'anystringoftext',// requires 3 things, secret is a key code that its gona require for cookies
                          saveUninitialized: true,// if a session comes in and its not initialized, will still save on database
                        })) // even if nothing is saved you can still save to database
app.use('/', function(req, res){
  res.send('hello');
});

app.listen(port);
console.log('Server running on port:' + port);
