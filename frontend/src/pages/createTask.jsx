import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../services/taskService';


const CreateTask = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        state: 0
    });

    //Permite capturar los campos del form
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    //Funcionalidad para crear la task
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title.trim()) {
            Swal.fire("Error", "El título es obligatorio", "error");
            return;
        }

        await createTask(form);

        Swal.fire("¡Creada!", "La tarea fue registrada con éxito", "success");

        navigate("/");
    }

    return (
        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Crear Tarea</h3>
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
                                placeholder="Ingrese el título"
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
                                placeholder="Ingrese una descripción (Opcional)"
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
                                <option value="1">Completada</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-success px-4">
                            Crear
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateTask
