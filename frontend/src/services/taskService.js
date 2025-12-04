import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

//Obtener todas las Tasks
export const getTasks = async () => {
    const res = await axios.get(`${VITE_API_URL}/tasks`);
    return res.data.data.task;
};

//Obtener solo una Task
export const getTaskId = async (id_task) => {
    const res = await axios.get(`${VITE_API_URL}/tasks/${id_task}`);
    return res.data.data.task;
}

//Crear Task
export const createTask = async (task) => {
    const res = await axios.post(`${VITE_API_URL}/tasks`, task);
    return res.data;
};

//Eliminar Task
export const deleteTask = async (id_task) => {
    const res = await axios.delete(`${VITE_API_URL}/tasks/${id_task}`);
    return res.data;
};

//Actualizar Task
export const updateTask = async (id_task, task) => {
    const res = await axios.put(`${VITE_API_URL}/tasks/${id_task}`, task);
    return res.data;
};

//Completar una Tarea
export const completeTask = async (id_task) => {

    // Obtiene la tarea completa
    const task = await getTaskId(id_task);

    // Arma el nuevo objeto con todos los datos
    const updatedTask = {
        title: task.title,
        description: task.description,
        state: 1
    };

    // Envia al backend la actualización completa
    const res = await axios.put(`${VITE_API_URL}/tasks/${id_task}`, updatedTask);
    return res.data;
};