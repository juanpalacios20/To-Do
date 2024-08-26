import ListCard from "../../listCard/ListCard"
import ListCardButton from "../../listCard/ListCardButton"

function Home() {
    return (
        <div className="HomeContainer PageContentBack transition-all duration-300">
            <div className="Home PageContent transition-all duration-300">
                <div className="HomeCards flex flex-row absolute w-[98%] h-[70%] justify-evenly">
                    <ListCard estado="Pendientes" >
                        {/* Aqui va la lista de tareas */}
                        <div className="ListCardTasks flex flex-col gap-4">
                            <ListCardButton text="Tarea 1" /* Recibe atributos como un boton cualqiera del html ej: onClick  */ />
                        </div>
                    </ListCard>
                    <ListCard estado="En proceso" />
                    <ListCard estado="Completadas" />
                </div>
            </div>
        </div>
    )
}

export default Home