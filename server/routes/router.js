const express = require('express');
const route = express.Router();
const { isAuthorised } = require('./auth');
const services = require('../services/render');
const controller = require('../controller/controller');
const taskController = require('../controller/taskController');

// EJS On Page Load routes.
route.get('/index', isAuthorised, services.homeRoutes);
route.get('/add-user', isAuthorised, services.add_user);
route.get('/update-user', isAuthorised, services.update_user);

route.get('/tasks', isAuthorised, services.taskRoutes);
route.get('/add-task', isAuthorised, services.add_task);
route.get('/update-task', isAuthorised, services.update_task);

// API - EJS/Frontend
route.post('/api/users', isAuthorised, controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', isAuthorised, controller.update);
route.delete('/api/users/:id', isAuthorised, controller.delete);

// Task API
route.post('/api/tasks', isAuthorised, taskController.create);
route.get('/api/tasks', taskController.find);
route.put('/api/tasks/:id', isAuthorised, taskController.update);
route.delete('/api/tasks/:id', isAuthorised, taskController.delete);

module.exports = route;
