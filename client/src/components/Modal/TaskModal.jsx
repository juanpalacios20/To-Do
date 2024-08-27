import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function TaskModal({ state, toggleOff, tarea, onTaskCreated }) {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    // Actualiza el estado del formulario cuando se carga una tarea para editar
    useEffect(() => {
        if (tarea) {
            setNombre(tarea.titulo);
            setDescripcion(tarea.descripcion);
        } else {
            setNombre('');
            setDescripcion('');
        }
    }, [tarea]);

    // Función para obtener la lista actualizada de tareas
    const fetchTareas = () => {
        axios.get('http://localhost:8000/tareas/obtener/')
            .then(response => {
                const tareasData = response.data;
                // Pasa la lista actualizada de tareas al componente padre
                onTaskCreated(tareasData);
            })
            .catch(error => {
                console.error("Hubo un error al obtener las tareas:", error);
            });
    };

    // Maneja el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();

        const nuevaTarea = {
            titulo: nombre,
            descripcion: descripcion,
            // No se envían user, estado y categoria ya que se definen en el backend
        };

        if (tarea) {
            // Editar tarea
            axios.put(`http://localhost:8000/tareas/${tarea.id}/editar/`, nuevaTarea)
                .then(response => {
                    console.log("Tarea actualizada:", response.data);
                    fetchTareas(); // Actualiza la lista de tareas después de editar
                    toggleOff();
                })
                .catch(error => {
                    console.error("Hubo un error al actualizar la tarea:", error);
                });
        } else {
            // Crear nueva tarea
            axios.post('http://localhost:8000/tareas/crear/', nuevaTarea)
                .then(response => {
                    console.log("Tarea creada:", response.data);
                    fetchTareas(); // Actualiza la lista de tareas después de crear
                    toggleOff();
                })
                .catch(error => {
                    console.error("Hubo un error al crear la tarea:", error);
                });
        }
    };

    if (state === true) {
        return (
            <dialog className="TaskModalContainer">
                <div className="TaskModal flex flex-col w-[80%] h-1/2 rounded-[50px]">
                    <div className="TaskModalTitle text-center mt-6">
                        <h2 className='text-5xl font-bold'>{tarea ? 'Editar Tarea' : 'Crear Tarea'}</h2>
                    </div>
                    <form className='TaskModalForm flex flex-col gap-4 px-20' onSubmit={handleSubmit}>
                        <div className="TaskModalFormNombre flex flex-col">
                            <label className='text-4xl' htmlFor="Nombre">Nombre</label>
                            <input
                                className='TaskModalFormDescripcionInput text-2xl rounded-xl'
                                type="text"
                                name="Nombre"
                                id="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="TaskModalFormDescripcion flex flex-col">
                            <label className='text-4xl' htmlFor="Descripcion">Descripcion</label>
                            <textarea
                                className='TaskModalFormDescripcionTextArea text-2xl resize-none rounded-xl'
                                name="Descripcion"
                                id="Descripcion"
                                cols="30"
                                rows="5"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="TaskModalFormButtons flex justify-evenly w-[80%] mx-auto">
                            <button className='TaskModalFormButton py-2 px-14 text-xl Transition transition-all duration-300' type="submit">Guardar</button>
                            <button className='TaskModalFormButton py-2 px-14 text-xl bg-red-700 dark:bg-red-700 Transition transition-all duration-300' onClick={() => toggleOff()}>Cancelar</button>
                            {tarea ? (
                                <button className='TaskModalFormButton py-2 px-14 text-xl bg-transparent dark:bg-transparent border-4 border-red-700 Transition transition-all duration-300 hover:bg-red-700 hover:dark:bg-red-700' onClick={() => {
                                    axios.delete(`http://localhost:8000/tareas/${tarea.id}/eliminar/`)
                                        .then(response => {
                                            console.log("Tarea eliminada:", response.data);
                                            fetchTareas(); // Actualiza la lista de tareas después de eliminar
                                            toggleOff();
                                        })
                                        .catch(error => {
                                            console.error("Hubo un error al eliminar la tarea:", error);
                                        });
                                }}>Eliminar</button>
                            ) : null}
                        </div>
                    </form>
                </div>
            </dialog>
        );
    }
    return null;
}

TaskModal.propTypes = {
    state: PropTypes.bool.isRequired,
    toggleOff: PropTypes.func.isRequired,
    tarea: PropTypes.object,
    onTaskCreated: PropTypes.func.isRequired,
};

export default TaskModal;
