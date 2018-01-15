var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var cookieParser = require('cookie-parser');
var session = require('express-session'); // brings in modules so we can use them

var morgan = require('morgan'); //logs
var mongoose = require('mongoose');

var configDB = require('./config/database.js'); //brings in config folder and stating route of file
//mongoose.connect(configDB.url);//tell mongoose to connect to server
mongoose.connect(configDB.url);//tell mongoose to connect to server

// mongoose.connect("mongodb://localhost:27017/node_login", { useMongoClient: true });
// mongoose.Promise = global.Promise;
// let db = mongoose.connection;  //can use the above mongoose config to refer o file outside or this commented out stuff if want to keep it in server, still need to start mongod on seperate console at same time

app.use(morgan('dev')); //request to server will use app morgan
app.use(cookieParser()); //sets request.cookies variable and saves it in there but dont really need anymore
app.use(session({secret: 'anystringoftext',// requires 3 things, secret is a key code that its gona require for cookies
                 saveUninitialized: true,// if a session comes in and its not initialized, will still save on database
                 resave: true})); // even if nothing is saved you can still save to database

// app.use('/', function(req, res){
//   res.send('hello');
//   console.log(req.cookies);
//   console.log('************************************');
//   console.log(req.session);
// });

require('./app/routes.js')(app); //tells server listing apps in a separate file

app.listen(port);
console.log('Server running on port:' + port);
