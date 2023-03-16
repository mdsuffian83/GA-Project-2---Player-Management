const mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userdb', // ref links to the model name not the variable name
    required: true,
  },
  training: {
    type: String,
    required: true,
  },
  coaches: {
    type: String,
    required: true,
  },
});

const TaskModel = mongoose.model('task', taskSchema);

module.exports = TaskModel;
