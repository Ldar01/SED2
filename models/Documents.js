var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DocumentsSchema = new Schema({
  path:  { type: String },
  caption: { type: String }
  });

module.exports = mongoose.model('Documents', DocumentsSchema);