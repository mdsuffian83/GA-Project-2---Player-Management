const mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
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

const TaskModel = mongoose.model('task', taskSchema);

module.exports = TaskModel;
