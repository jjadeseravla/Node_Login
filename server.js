var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var cookieParser = require('cookie-parser');
var session = require('express-session'); // brings in modules so we can use them

var morgan = require('morgan'); //logs
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session); //already assigned session to express-session on line 6

var configDB = require('./config/database.js'); //brings in config folder and stating route of file
//mongoose.connect(configDB.url);//tell mongoose to connect to server
mongoose.connect(configDB.url);//tell mongoose to connect to server
// mongoose.connect("mongodb://localhost:27017/node_login", { useMongoClient: true });
// mongoose.Promise = global.Promise;
// let db = mongoose.connection;  //can use the above mongoose config to refer o file outside or this commented out stuff if want to keep it in server, still need to start mongod on seperate console at same time
require('./config/passport')(passport);//set up config for passport so app uses it.  do this by sending passport object like this: (passport)


app.use(morgan('dev')); //request to server will use app morgan
app.use(cookieParser()); //sets request.cookies variable and saves it in there but dont really need anymore
app.use(bodyParser.urlencoded({extended: false})); //allows any objects to be sent through, not just strings etc, but put it in false as only sending strings here
app.use(session({secret: 'anystringoftext',// requires 3 things, secret is a key code that its gona require for cookies
                 saveUninitialized: true,// if a session comes in and its not initialized, will still save on database
                 resave: true, // even if nothing is saved you can still save to database
                 sotre: new MongoStore({ mongooseConnection : mongoose.connection })})); //reuse line 17
                 //connect session just saves to servers RAM memory all the session data, so how do we save these sessions to permanent storage?
app.use(passport.initialize()); //starts passport up
app.use(passport.session()) //piggbacks off session on line 25 so must be underneath it.  theres only one session, but passport uses revious express session
app.use(flash()); //to make sure all flash messages are being updated

app.set('view engine', 'ejs'); //where our pages are going to reside

// app.use('/', function(req, res){
//   res.send('hello');
//   console.log(req.cookies);
//   console.log('************************************');
//   console.log(req.session);
// });

require('./app/routes.js')(app, passport); //tells server listing apps in a separate file and pass our passport to pur routes.  so when user navigates to a certain url, routes know passport exists.

app.listen(port);
console.log('Server running on port:' + port);
