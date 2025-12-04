const pool = require('../config/database');

//clase donde se almacenan las tareas del modelo
class Task {

    //trae toda la consulta de las task desde la base de datos
    static async getTaks() {
        try {
            const [task] = await pool.query('SELECT * FROM task');

            return task;
        } catch (error) {
            console.error('Error en model getTask: ', error);
            throw error;
        }
    }

    //trae una sola task de acuerdo a su Id
    static async getTaskId(id_task) {
        try {
            const [task] = await pool.query(`SELECT * FROM task WHERE id_task = ?`, [id_task]);

            return task[0];
        } catch (error) {
            console.error('Error en model getTaskId: ', error);
            throw error;
        }
    }

    //crea una task en la bd
    static async createTask(task) {
        try {
            const { title, description, state } = task;

            const [result] = await pool.query(
                `INSERT INTO task (title, description, state) VALUES (?, ?, ?)`,
                [title, description, state]
            );

            return result.insertId;
        } catch (error) {
            console.error('Error en model createTaks: ', error);
        }
    }

    //actualiza una task en la bd
    static async updateTask(id_task, task) {
        try {
            const { title, description, state } = task;

            const [result] = await pool.query(
                'UPDATE task SET title = ?, description = ?, state = ? WHERE id_task = ?',
                [title, description, state, id_task]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error en model updateTask: ', error);
            throw error;
        }
    }

    //elimina una task de la bd
    static async deleteTask(id_task) {
        try {
            const [result] = await pool.query(
                'DELETE FROM task WHERE id_task = ?',
                [id_task]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error en model deleteTask:', error);
            throw error;
        }
    }
};

module.exports = Task;