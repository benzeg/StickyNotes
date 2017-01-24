var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');
// var config = require('./config');

var User = mongoose.model('User', db.users);

module.exports = User;