const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');
const taskController = require('../controller/taskController');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/index', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)

/**
 *  @description taskRoot Route
 *  @method GET /
 */
route.get('/tasks', services.taskRoutes);

/**
 *  @description add tasks
 *  @method GET /add-task
 */
route.get('/add-task', services.add_task)

/**
 *  @description for update tasks
 *  @method GET /update-task
 */
route.get('/update-task', services.update_task)

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