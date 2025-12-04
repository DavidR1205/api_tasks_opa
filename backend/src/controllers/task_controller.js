const { validationResult } = require('express-validator');
const taskModel = require('../models/task_model');

//get /task - lista todas las task
exports.getAllTask = async (req, res) => {
    try {
        //fetch de todas las task desde el modelo
        const task = await taskModel.getTaks();

        res.status(200).json({
            status: 'success',
            message: 'Tasks retrieved successfully',
            data: {
                task
            }
        });

    } catch (error) {
        //log interno para debugging de error
        console.error('Error en getAllTask:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve tasks',
            error: error.message
        });
    }
};

// GET /task:id - para obtener una sola task
exports.getTaskId = async (req, res) => {
    try {
        const { id_task } = req.params;
        const task = await taskModel.getTaskId(id_task);

        if (!task) {
            return res.status(404).json({
                status: 'error',
                message: 'Task not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Task retrieved successfully',
            data: { task }
        });

    } catch (error) {
        //log interno para debugging de error
        console.error('Error en controlador getTaskId: ', error);
        res.status(500).json({
            status: 'error',
            message: 'failed to retrieve task',
            error: error.message
        })
    }
};

// POST /task - crear un nueva task
exports.createTask = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { title, description, state } = req.body;

        const newTask = {
            title,
            description,
            state
        };

        const insertedId = await taskModel.createTask(newTask);

        res.status(201).json({
            status: 'success',
            message: 'Taks created successfully',
            data: { id_task: insertedId }
        });

    } catch (error) {
        //log interno para debugging de error
        console.error('Error en controlador createTask: ', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create task',
            error: error.message
        });
    }
};

//PUT /tasks/:id - actualizar una task
exports.updateTask = async (req, res) => {
    try {
        const { id_task } = req.params;

        const existingTask = await taskModel.getTaskId(id_task);
        if (!existingTask) {
            return res.status(404).json({
                status: 'error',
                message: 'Task not found'
            });
        }

        const { title, description, state } = req.body;

        const updateData = {
            title,
            description,
            state
        };

        const updated = await taskModel.updateTask(id_task, updateData);

        res.status(200).json({
            status: 'success',
            message: 'Task updated successfully',
            data: { updated }
        });

    } catch (error) {
        //log interno para debugging de error
        console.error('Error en controlador updateTask:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to update task',
            error: error.message
        });
    }
};

//DELETE /tasks/:id - Eliminar task
exports.deletetask = async (req, res) => {
    try {
        const { id_task } = req.params;

        const existingTask = await taskModel.getTaskId(id_task);

        if (!existingTask) {
            return res.status(404).json({
                status: 'error',
                message: 'Task not found'
            });
        }

        await taskModel.deleteTask(id_task);

        res.status(200).json({
            status: 'success',
            message: 'Task deleted successfully'
        });

    } catch (error) {
        //log interno para debugging de error
        console.error('Error en controlador deleteTask: ', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete task',
            error: error.message
        });
    }
};