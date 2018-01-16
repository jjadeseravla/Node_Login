var LocalStrategy = require('passport-local').Strategy

var User = require('../app/models/user');//bring in user schema we created for our database

module.exports = function(passport){//allows this section to be available to the rest of our program
  password.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){ //search mongoDB using mongoose, for this id and will return err and user if doesnt find one
      done(err, user);
    });
  });
    passport.use('local-signup', new LocalStrategy({
      usernameField: 'email', //rename fields they have eg username field is going to be an email.  it looks up at ejs file
      passwordField: 'password',
      passReqToCallback: true //true lets us have an extra parameter than our request.
    },
      function(req, email, password, done){ //done is a callback
        process.nextTick(function(){// a node.js function to make it asynchronous, so unless data is sent back, our lookup in database wont fire. this section doesnt execute til everything else is done
          User.findOne({'local.email': email}, function(err, user){
            if(err)
              return done(err); //return err back to whoever called it
            if(user){ //if theres a user with this email already in db, then dont want to reregister user, we instead let them know with a flash err on screen
              return done(null, false, req.flash('signupMessage', 'The email you have types in is already taken'));
            } else {
              var newUser = new User();
              newUser.local.email = email;
              newUser.local.password = password; //just saving these as free text but need to hash passwords for security

              newUser.save(function(err){
                if(err)
                  throw err;
                  reuturn done(null, newUser); //otherwise return done(no err), which is null and return our new user
              })
            }
          })//finding a user in the DB and if theyre not there we can sign them up.  look for an email in DB that matches
      });
    }
  ))
}
//serialise a user: take large object and break it down to something that shows its simplest form. eg user with username/password etc and we try save it in session storage
//(eg go to website and it knows youre logged in), its just using a user id to tell its you
//deserialize is to get id of user to show you all of the info eg bday/username/password etc.

//info on passport config is in their documentation
