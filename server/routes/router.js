const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');
const taskController = require('../controller/taskController');

route.get('/index', services.homeRoutes);
route.get('/add-user', services.add_user);
route.get('/update-user', services.update_user);

route.get('/tasks', services.taskRoutes);
route.get('/add-task', services.add_task);
route.get('/update-task', services.update_task);

// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

// Task API
route.post('/api/tasks', taskController.create);
route.get('/api/tasks', taskController.find);
route.put('/api/tasks/:id', taskController.update);
route.delete('/api/tasks/:id', taskController.delete);

module.exports = route;
