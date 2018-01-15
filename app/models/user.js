//this is the schema: how it looks in database

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  local: {
    username: String,
    password: String
  }
});

module.exports = mongoose.model('User', userSchema); // allows access outside this file
