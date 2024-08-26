import { lazy, useState } from "react"
import ListCard from "../../listCard/ListCard"
import ListCardButton from "../../listCard/ListCardButton"

const LazyModal = lazy(() => import('../../Modal/TaskModal.jsx'))

function Home() {

    const [taskModal, setTaskModal] = useState(false)

    function closeTaskModal() {
        setTaskModal(false)
    }

    return (
        <>
            <div className="HomeContainer PageContentBack transition-all duration-300">
                <div className="Home PageContent transition-all duration-300">
                    <div className="HomeCards flex flex-row absolute w-[98%] h-[70%] justify-evenly">
                        <ListCard estado="Pendientes" add={() => setTaskModal(true)} >
                            {/* Aqui va la lista de tareas */}
                            <div className="ListCardTasks flex flex-col gap-4">
                                <ListCardButton onClick={() => setTaskModal(true)} text="Tarea 1" /* Recibe atributos como un boton cualqiera del html ej: onClick  */ />
                            </div>
                        </ListCard>
                        <ListCard estado="En proceso" />
                        <ListCard estado="Completadas" />
                    </div>
                </div>
            </div>
            {/* ======================================= Dark Mode ======================================= */}
            <LazyModal tareas state={taskModal} toggleOff={closeTaskModal} />
        </>
    )
}

export default Home