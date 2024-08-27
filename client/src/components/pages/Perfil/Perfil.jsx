import { useState, useEffect } from "react";
import PerfilButton from "./PerfilButton";
import PerfilToast from "./PerfilToast";

function Perfil() {
    const [showPassword, setShowPassword] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [conteoTareas, setConteoTareas] = useState({
        pendientes: 0,
        en_proceso: 0,
        completadas: 0
    });

    useEffect(() => {
        // Obtener información del usuario
        fetch('http://localhost:8000/usuarios/1/')
            .then(response => response.json())
            .then(data => setUsuario(data))
            .catch(error => console.error('Error al obtener usuario:', error));

        // Obtener conteo de tareas
        fetch('http://localhost:8000/tareas/conteo/')
            .then(response => response.json())
            .then(data => setConteoTareas(data))
            .catch(error => console.error('Error al obtener conteo de tareas:', error));
    }, []);

    function ShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <div className="PerfilContainer PageContentBack transition-all duration-300">
            <div className="Perfil flex flex-row PageContent transition-all duration-300">
                <div className="PerfilImage h-full mt-20">
                    <div className="NavBarPerfil PerfilIcon p-2 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="NavBarPerfilIcon size-96">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </div>
                </div>
                <div className="PerfilContent flex flex-col w-[60%] h-full mt-40 gap-2">
                    <h2 className=" PerfilContentText Name text-7xl font-bold">{usuario ? usuario.username : 'Cargando...'}</h2>
                    <h2 className=" PerfilContentText Email text-7xl font-bold mt-10">Correo</h2>
                    <div className="PerfilContentEmail flex flex-row justify-between content-center">
                        <h3 className="PerfilContentText EmailText text-5xl">{usuario ? usuario.email : 'Cargando...'}</h3>
                        <PerfilButton className="PerfilContentButton EmailButton text-3xl mr-64 py-4 px-14 Transition transition-all duration-300 rounded-xl">Cambiar</PerfilButton>
                    </div>
                    <h2 className=" PerfilContentText Email text-7xl font-bold content-center">Contraseña</h2>
                    <div className="PerfilContentPassword flex flex-row justify-between">
                        {showPassword ?
                            <h3 className="PerfilContentText PasswordText text-5xl">
                                passwordUser
                                </h3>
                            :
                            <h3 className="PerfilContentText PasswordText text-5xl">************</h3>
                        }
                        <PerfilButton onClick={ShowPassword} className="PerfilContentButton EmailButton text-3xl py-4 px-4 Transition transition-all duration-300 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </PerfilButton>
                        <PerfilButton className="PerfilContentButton EmailButton text-3xl mr-64 py-4 px-4 Transition transition-all duration-300 rounded-xl">Cambiar</PerfilButton>
                    </div>
                    <div className="PerfilContentStats flex flex-row gap-10 mt-10">
                        <PerfilToast title='# tareas pendientes' numero={conteoTareas.pendientes || 0} />
                        <PerfilToast title='# tareas en progreso' numero={conteoTareas.en_proceso || 0} />
                        <PerfilToast title='# tareas completadas' numero={conteoTareas.completadas || 0} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;
