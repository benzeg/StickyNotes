var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
  title: String,
  contentState: String
});

var Note = mongoose.model('Note', noteSchema);

module.exports = Note;