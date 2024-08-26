import { PropTypes } from 'prop-types'

function TaskModal(props) {

    TaskModal.propTypes = {
        state: PropTypes.bool.isRequired,
        toggleOff: PropTypes.func.isRequired,
        tarea: PropTypes.bool
    }
    if (props.state === true) {
        return (
            <dialog className="TaskModalContainer">
                <div className="TaskModal flex flex-col w-[80%] h-1/2 rounded-[50px]">
                    <div className="TaskModalTitle text-center mt-6">
                        <h2 className='text-5xl font-bold'>{props.tarea ? 'Editar Tarea' : 'Crear Tarea'}</h2>
                    </div>
                    <form className='TaskModalForm flex flex-col gap-4 px-20'>
                        <div className="TaskModalFormNombre flex flex-col">
                            <label className='text-4xl' htmlFor="Nombre">Nombre</label>
                            <input className='TaskModalFormDescripcionInput text-2xl rounded-xl' type="text" name="Nombre" id="Nombre" />
                        </div>
                        <div className="TaskModalFormDescripcion flex flex-col">
                            <label className='text-4xl' htmlFor="Descripcion">Descripcion</label>
                            <textarea className='TaskModalFormDescripcionTextArea text-2xl resize-none rounded-xl' name="Descripcion" id="Descripcion" cols="30" rows="5"></textarea>
                        </div>
                        <div className="TaskModalFormButtons flex justify-evenly w-[80%] mx-auto">
                            <button className='TaskModalFormButton py-2 px-14 text-xl Transition transition-all duration-300' type="submit">Guardar</button>
                            <button className='TaskModalFormButton py-2 px-14 text-xl bg-red-700 dark:bg-red-700 Transition transition-all duration-300' onClick={() => props.toggleOff()}>Cancelar</button>
                            {props.tarea ? <button className='TaskModalFormButton py-2 px-14 text-xl bg-red-700 dark:bg-red-700 Transition transition-all duration-300' onClick={''}>Cancelar</button> : null}
                        </div>
                    </form>
                </div>
            </dialog>
        )
    } else {
        return null
    }
}

export default TaskModal