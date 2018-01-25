module.exports = function(router, passport){

  router.use(function(req, res, next) {
      if(req.isAuthenticated()){
        return next(); //is user has already been authenticated we want to continue
      }
      res.redirect('/auth'); //otherwise redirect to login page

  });
}
