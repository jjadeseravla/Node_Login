module.exports = function(router, passport){

  router.use(function (req, res, next) {
      if(req.isAuthenticated()){
        return next(); //is user has already been authenticated we want to continue
      }
      res.redirect('/auth'); //otherwise redirect to login page if req.isAuthenticated is false

  });

  router.get('/profile', function(req, res) { //if req.isAuthenticated is true goes here
    res.render('profile.ejs', { user: req.user })
  });

  router.get('/*', function(req, res) { // star goes to any route (eg catches all, anything that you write in localhost eg localhost:8080/whatttt)
    res.redirect('/profile'); //this router redirects to our profile if you do something dumb like try to authenticate yourself when you have already etc
  })
}
