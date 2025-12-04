import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getTasks, deleteTask, completeTask } from '../services/taskService';
import { FaCheck } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";


const ListTasks = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    
    //Carga las tareas desde el servicio al iniciar la vista
    useEffect(() => {
        const loadTasks = async () => {
            const data = await getTasks();
            setTasks(data);
        };

        loadTasks();
    }, []);

    //Funcionalidad para elminar una Task
    const handleDelete = async (task) => {
        const result = await Swal.fire({
            title: `¿Eliminar la tarea?`,
            text: `Desea eliminar la tarea ${task.title}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            await deleteTask(task.id_task);
            const data = await getTasks();
            setTasks(data);

            Swal.fire({
                title: "¡Eliminada!",
                text: "La tarea ha sido eliminada con exito",
                icon: "success",
            });
        }
    };

    //Funcionalidad para marcar como completa una Task
    const handleComplete = async (task) => {
        if (task.state === 1) {
            return Swal.fire("Aviso", "La tarea ya está completada", "info");
        }

        await completeTask(task.id_task);

        Swal.fire("Completada", "La tarea ha sido marcada como completada", "success");

        const data = await getTasks();
        setTasks(data);
    };


    return (
        <div className="container mt-5 py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>
                    Lista de Tareas
                </h3>

                <button
                    className="btn btn-outline-success px-4"
                    onClick={() => navigate('/create')}
                >
                    <MdAddTask size={22} className='mx-2'/>
                    Crear tarea
                </button>
            </div>

            <div className="card border-0">
                <div className="card-body p-0">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tasks.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-muted">
                                        No hay tareas registradas
                                    </td>
                                </tr>
                            ) : (
                                tasks.map((task) => (
                                    <tr key={task.id_task}
                                        className={task.state === 1 ? "table-success" : ""}
                                    >
                                        <td className="fw-semibold">{task.title}</td>
                                        <td>{task.description}</td>
                                        <td>
                                            <span
                                                className={`badge px-3 py-2 ${task.state === 1
                                                    ? "bg-success"
                                                    : "bg-secondary"
                                                    }`}
                                            >
                                                {task.state === 1 ? "Completado" : "Pendiente"}
                                            </span>
                                        </td>
                                        <td className="text-center">

                                            <button
                                                onClick={() => handleComplete(task)}
                                                className="btn btn-outline-primary btn-sm me-1"
                                                data-bs-toggle="tooltip"
                                                title="Completar tarea"
                                            >
                                                <FaCheck />
                                            </button>

                                            <button
                                                onClick={() => navigate(`/edit/${task.id_task}`)}
                                                className="btn btn-warning btn-sm me-1"
                                                data-bs-toggle="tooltip"
                                                title="Editar tarea"
                                            >
                                                <MdEdit />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(task)}
                                                className="btn btn-danger btn-sm"
                                                data-bs-toggle="tooltip"
                                                title="Eliminar tarea"
                                            >
                                                <FaRegTrashAlt />
                                            </button>

                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListTasks
