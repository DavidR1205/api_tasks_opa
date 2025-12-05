import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTask, getTaskId } from '../services/taskService';


const EditTask = () => {
    const { id_task } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        description: '',
        state: 0
    });

      //Carga las tareas desde el servicio al iniciar la vista
    useEffect(() => {
        const loadTask = async () => {
            const data = await getTaskId(id_task);
            setForm(data);
        };

        loadTask();
    }, [id_task]);

    //Permite capturar los campos del form
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    //Funcionalidad para actualizar la Task
    const handleSubmit = async (e) => {
        e.preventDefault();

        await updateTask(id_task, form);

        Swal.fire("Actualizada", "La tarea fue modificada con éxito", "success");

        navigate("/");
    };

    return (
        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Editar Tarea</h3>
                <button className="btn btn-secondary" onClick={() => navigate("/")}>
                    Volver
                </button>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Título</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={form.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <textarea
                                name="description"
                                className="form-control"
                                rows="3"
                                value={form.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Estado</label>
                            <select
                                name="state"
                                className="form-select"
                                value={form.state}
                                onChange={handleChange}
                            >
                                <option value="0">Pendiente</option>
                                <option value="1">Completado</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary px-4">
                            Actualizar
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTask
