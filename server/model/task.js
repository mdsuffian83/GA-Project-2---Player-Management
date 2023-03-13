const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
   name : {
      type: String,
      required: true
   },
   training : {
      type: String,
      required: true
   },
   coaches : {
      type : String,
      required : true
   },
})

const TaskModel = mongoose.model('task', Schema);

module.exports = TaskModel;

