var User = require('./models/user'); //bring in the user.js file
module.exports = function(app, passport){
  app.get('/', function(req, res){
    res.render('index.ejs');
  });

  app.get('/login', function(req, res){
    res.render('login.ejs', { message: req.flash('loginMessage') }); //route for login page and req.flash if there is an error
  });
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    faliureRedirect:'/login',
    failureFlash: true
  }));

  app.get('/signup', function(req, res){
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/', //where we want them to go if theyve had a successful sign up
    failureRedirect: '/signup', //failure eg put an email thats already registered
    failureFlash: true //if they tried to sign up an email already in use are they expecting a flash back? yes so true
  }));

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', { user: req.user}) //send it the object: user.  when we get a user back thats authenticated, we'll have a req.user variable to use and we can send it to profile.ejs that can print all the info.
  }); //isLoggedIn is middleware have to go through for anyone who goes to profile

  app.get('/:username/:password', function(req, res){ //params: what you type in the url
    var newUser = new User();
    newUser.local.username = req.params.username;
    newUser.local.password = req.params.password;
    console.log(newUser.local.username + " " + newUser.local.password);
    newUser.save(function(err){
      if(err)
        throw err;
    });
    res.send("Success!");
  });

  app.get('/logout', function(req, res) {
    req.logout(); //logout is a passport funciton that passport adds the logout to express
    res.redirect('/');
  })
};

function isLoggedIn(req, res, next) {  //next is last middleware
  if(req.isAuthenticated()){
    return next(); //is user has already been authenticated we want to continue
  }
  res.redirect('/login'); //otherwise redirect to login page
}
