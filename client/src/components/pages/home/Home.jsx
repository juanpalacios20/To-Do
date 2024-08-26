import { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from './utils';
import ListCard from "../../listCard/ListCard";
import ListCardButton from "../../listCard/ListCardButton";

const LazyModal = lazy(() => import('../../Modal/TaskModal.jsx'))

function Home() {
    const [tareas, setTareas] = useState([]);
    const [state, setState] = useState(false);
    const [scene, setScene] = useState({
        type: "container",
        props: { orientation: "horizontal" },
        children: []
    });

    useEffect(() => {
        axios.get('http://localhost:8000/tareas/obtener/')
            .then(response => {
                const tareasData = response.data;
                setTareas(tareasData);

                const columnas = ['Pendientes', 'En proceso', 'Completadas'];
                const sceneData = {
                    type: "container",
                    props: { orientation: "horizontal" },
                    children: columnas.map(estado => ({
                        id: estado,
                        type: "container",
                        name: estado,
                        props: {
                            orientation: "vertical",
                            className: "card-container"
                        },
                        children: tareasData.filter(tarea => tarea.estado.nombre === estado).map(tarea => ({
                            type: "draggable",
                            id: tarea.id.toString(),
                            props: {
                                className: "card",
                                style: { backgroundColor: pickColor() }
                            },
                            data: tarea.titulo
                        }))
                    }))
                };

                setScene(sceneData);
            })
            .catch(error => {
                console.error("Hubo un error al obtener las tareas:", error);
            });
    }, []);

    console.log(tareas);

    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            const updatedScene = { ...scene };
            const column = updatedScene.children.find(p => p.id === columnId);
            const columnIndex = updatedScene.children.indexOf(column);

            const newColumn = { ...column };
            newColumn.children = applyDrag(newColumn.children, dropResult);
            updatedScene.children.splice(columnIndex, 1, newColumn);

            setScene(updatedScene);

            // Actualiza el estado de las tareas en el backend
            const movedTaskId = dropResult.payload.id;
            const nuevoEstado = column.name;  // Usa el nombre de la columna para determinar el estado

            axios.put(`http://localhost:8000/tareas/${movedTaskId}/actualizar_estado/`, { estado: nuevoEstado })
                .then(response => {
                    console.log("Estado actualizado:", response.data);
                })
                .catch(error => {
                    console.error("Hubo un error al actualizar el estado de la tarea:", error);
                });
        }
    };



    const getCardPayload = (columnId, index) => {
        return scene.children.find(p => p.id === columnId).children[index];
    };

    return (
        <>
            <div className="HomeContainer PageContentBack transition-all duration-300">
                <div className="Home PageContent transition-all duration-300">
                    <div className="HomeCards flex flex-row absolute w-[98%] h-[70%] justify-evenly">
                        {scene.children.map(column => (
                            <ListCard add={() => setState(true)} key={column.id} estado={column.name}>
                                <Container
                                    orientation="vertical"
                                    groupName="col"
                                    onDrop={e => onCardDrop(column.id, e)}
                                    getChildPayload={index => getCardPayload(column.id, index)}
                                    dragClass="card-ghost"
                                    dropClass="card-ghost-drop"
                                    dropPlaceholder={{
                                        animationDuration: 150,
                                        showOnTop: true,
                                        className: 'drop-preview'
                                    }}
                                >
                                    {column.children.map(card => (
                                        <Draggable key={card.id}>
                                            <div {...card.props}>
                                                <ListCardButton onClick={() => setState(true)} text={card.data} task={card} />
                                            </div>
                                        </Draggable>
                                    ))}
                                </Container>
                            </ListCard>
                        ))}
                    </div>
                </div>
            </div>
            {/* Modal del formulario para crear o editar una tarea */}
            <Suspense>
                <LazyModal state={state} toggleOff={() => setState(false)} />
            </Suspense>
        </>
    );
}

const pickColor = () => {
    const cardColors = [
        "azure", "beige", "bisque", "blanchedalmond",
        "burlywood", "cornsilk", "gainsboro", "ghostwhite",
        "ivory", "khaki"
    ];
    return cardColors[Math.floor(Math.random() * cardColors.length)];
};

export default Home;
