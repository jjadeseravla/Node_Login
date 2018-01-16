var User = require('./models/user'); //bring in the user.js file
module.exports = function(app){
  app.get('/', function(req, res){
    res.render('index.ejs');
  });

  app.get('/signup', function(req, res){
    res.render('signup.ejs', { message: 'Server sending to ejs template (the client)'});
  });

  app.post('/signup', function(req, res){
    var newUser = new User();
    newUser.local.username = req.body.email; //on ejs template username is called email
    newUser.local.password = req.body.password;//body parser puts all of our form data into a request.object so we can get data from this
    newUser.save(function(err){
      if(err)
        throw err;
    });
    res.redirect('/');
  });

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
  })
}
