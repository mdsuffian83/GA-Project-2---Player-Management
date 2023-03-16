const mongoose = require('mongoose');

var modelschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  performance: {
    type: String,
    required: true,
  },
});

const Userdb = mongoose.model('userdb', modelschema);

module.exports = Userdb;
