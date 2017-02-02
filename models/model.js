var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var humanSchema = new Schema({
  name: String,
  age: Number
});

var Model = mongoose.model('Human', humanSchema);

module.exports = Model;