const mongoose = require('mongoose');

var loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

const Userdb = mongoose.model('admin', loginSchema);

module.exports = login;
