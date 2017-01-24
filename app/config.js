var mongoose = require('mongoose');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/test');

var Schema = mongoose.Schema;

var users = new Schema({
  username: String,
  password: String,
  timestamps: {type: Date, default: Date.now}
});

users.post('init', function(data) {
  var cipher = Promise.promisify(bcrypt.hash);
  cipher(data.password, null, null).bind(this)
      .then(function(hash) {
        data.password = hash;
      });
  //next();
});

module.exports.users = users;