import { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from './utils';
import ListCard from "../../listCard/ListCard";
import ListCardButton from "../../listCard/ListCardButton";

const LazyModal = lazy(() => import('../../Modal/TaskModal.jsx'));

function Home() {
    const [tareas, setTareas] = useState([]);
    const [state, setState] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null); // Nuevo estado para la tarea seleccionada
    const [scene, setScene] = useState({
        type: "container",
        props: { orientation: "horizontal" },
        children: []
    });

    // Mapeo de IDs de estado a nombres de estado
    const estadosMap = {
        1: 'Pendientes',
        2: 'En proceso',
        3: 'Completadas'
    };

    useEffect(() => {
        axios.get('http://localhost:8000/tareas/obtener/')
            .then(response => {
                const tareasData = response.data;
                setTareas(tareasData);

                const columnas = Object.values(estadosMap);
                const sceneData = {
                    type: "container",
                    props: { orientation: "horizontal" },
                    children: columnas.map(estadoNombre => ({
                        id: estadoNombre,
                        type: "container",
                        name: estadoNombre,
                        props: {
                            orientation: "vertical",
                            className: "card-container"
                        },
                        children: tareasData
                            .filter(tarea => estadosMap[tarea.estado] === estadoNombre)
                            .map(tarea => ({
                                type: "draggable",
                                id: tarea.id.toString(),
                                props: {
                                    className: "card",
                                    style: { backgroundColor: pickColor() }
                                },
                                data: tarea.titulo,
                                tareaData: tarea // Incluye la información completa de la tarea
                            }))
                    }))
                };

                setScene(sceneData);
            })
            .catch(error => {
                console.error("Hubo un error al obtener las tareas:", error);
            });
    }, []);

    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            const updatedScene = { ...scene };
            const column = updatedScene.children.find(p => p.id === columnId);
            const columnIndex = updatedScene.children.indexOf(column);
    
            const newColumn = { ...column };
            newColumn.children = applyDrag(newColumn.children, dropResult);
            updatedScene.children.splice(columnIndex, 1, newColumn);
    
            setScene(updatedScene);
    
            const movedTask = dropResult.payload.tareaData;
            const nuevoEstadoNombre = column.name;
            const nuevoEstadoId = Object.keys(estadosMap).find(key => estadosMap[key] === nuevoEstadoNombre);
    
            axios.put(`http://localhost:8000/tareas/${movedTask.id}/actualizar_estado/`, { estado: nuevoEstadoId })
                .then(response => {
                    console.log("Estado actualizado:", response.data);
    
                    // Actualizar el estado de la tarea en el frontend
                    const updatedTareas = tareas.map(tarea =>
                        tarea.id === movedTask.id ? { ...tarea, estado: nuevoEstadoId } : tarea
                    );
                    setTareas(updatedTareas);
    
                    // Actualizar la escena para reflejar el cambio
                    const updatedSceneWithState = {
                        ...updatedScene,
                        children: updatedScene.children.map(col => ({
                            ...col,
                            children: col.children.map(card =>
                                card.id === movedTask.id.toString()
                                    ? { ...card, tareaData: { ...card.tareaData, estado: nuevoEstadoId } }
                                    : card
                            )
                        }))
                    };
                    setScene(updatedSceneWithState);
                })
                .catch(error => {
                    console.error("Hubo un error al actualizar el estado de la tarea:", error);
                });
        }
    };
    

    const getCardPayload = (columnId, index) => {
        return scene.children.find(p => p.id === columnId).children[index];
    };

    const handleTaskCreated = (newTask) => {
        const updatedScene = { ...scene };
        const column = updatedScene.children.find(p => p.name === 'Pendientes');
        column.children.push({
            type: "draggable",
            id: newTask.id.toString(),
            props: {
                className: "card",
                style: { backgroundColor: pickColor() }
            },
            data: newTask.titulo,
            tareaData: newTask
        });
        setScene(updatedScene);
    };

    return (
        <>
            <div className="HomeContainer PageContentBack transition-all duration-300">
                <div className="Home PageContent transition-all duration-300">
                    <div className="HomeCards flex flex-row absolute w-[98%] h-[70%] justify-evenly">
                        {scene.children.map(column => (
                            <ListCard add={() => { setState(true); setSelectedTask(null); }} key={column.id} estado={column.name}>
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
                                                <ListCardButton onClick={() => { setState(true); setSelectedTask(card.tareaData); }} text={card.data} />
                                            </div>
                                        </Draggable>
                                    ))}
                                </Container>
                            </ListCard>
                        ))}
                    </div>
                </div>
            </div>
            <Suspense>
                <LazyModal tarea={selectedTask} state={state} toggleOff={() => setState(false)} onTaskCreated={handleTaskCreated} />
            </Suspense>
        </>
    )
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