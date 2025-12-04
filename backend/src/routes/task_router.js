const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task_controller');
const { createTaskValidator, idValidator, updateTaskValidator } = require('../middlewares/task_validator');

// Endponit GET para listar las task
router.get('/tasks', taskController.getAllTask);
// Endponit GET para traer una sola task
router.get('/tasks/:id_task', idValidator, taskController.getTaskId);
// Endpoint POST para crear una task
router.post('/tasks', createTaskValidator, taskController.createTask);
// Endpoint PUT para actualizar una task
router.put('/tasks/:id_task', updateTaskValidator, taskController.updateTask);
// Endponit DELETE para eliminar una task
router.delete('/tasks/:id_task', idValidator, taskController.deletetask);

module.exports = router;