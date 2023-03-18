const mongoose = require('mongoose');
const validator = require('validator'); // importing module/library

var loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (emailAdd) {
        return validator.isEmail(emailAdd);
      },
      message: 'Invalid email address!',
    },
  },
  nickname: {
    type: String,
    required: true,
    validate: {
      validator: function (nName) {
        return !validator.isEmpty(nName); // if return false means error.
        // lets say nickname is empty, -> true. !true -> false -> error
      },
      message: 'NickName is required!',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (pw) {
        return validator.isStrongPassword(pw, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        });
      },
      message:
        'Password must be at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol.',
    },
  },
});

const AdminModel = mongoose.model('admin', loginSchema);

module.exports = AdminModel;
