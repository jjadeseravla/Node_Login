module.exports = function(router, passport) {

  router.get('/testAPI', function(req, res) {
    res.json({ SecretData: 'abc123' });
  })
}
