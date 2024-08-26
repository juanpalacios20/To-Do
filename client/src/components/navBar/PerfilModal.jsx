import { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from 'axios'; // Asegúrate de tener axios instalado
import NavButton from "./NavButton";

function PerfilModal(props) {
    PerfilModal.propTypes = {
        state: PropTypes.bool.isRequired,
        toggleOff: PropTypes.func.isRequired,
        perfil: PropTypes.bool,
        children: PropTypes.object.isRequired
    };

    const [open, setOpen] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const ref = useRef();

    useEffect(() => {
        if (props.state) {
            axios.get('http://localhost:8000/categorias/obtener/')
                .then(response => {
                    setCategorias(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("Hubo un error al obtener las categorías:", error);
                });
        }
    }, [props.state]);

    function CloseModal() {
        props.toggleOff();
    }

    function Out() {
        ref.current.focus();
        setOpen(true);
    }

    function In() {
        setOpen(false);
    }

    if (props.state === true) {
        return (
            <dialog ref={ref} className={props.perfil ? 'ModalContainer' : 'ModalContainerMenu'} onMouseLeave={Out} onMouseEnter={In} {...open === true && { onBlur: CloseModal }}>
                {props.perfil ? <>
                    <div onClick={CloseModal} className="NavBarPerfil ModalOpenIconPerfil hover:cursor-pointer p-2 Transition transition-all duration-300 z-50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="NavBarPerfilIcon size-16">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </div>
                    <div className="ModalNombre flex justify-center items-center w-full h-fit py-6">
                        <span className="ModalNombre text-4xl text-center">Hola</span>
                    </div>
                </> :
                    <>
                        <div onClick={CloseModal} className="NavBarPerfil ModalOpenIconMenu hover:cursor-pointer Transition transition-all duration-300 z-50">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" NavBarMenuIcon ModalMenuIcon text-[#EEA138] size-20 dark:text-[#EEA138]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </div>
                        <div className="ModalNombre flex ml-32 w-full h-fit py-6">
                            <span className="ModalNombre text-5xl text-center">Carpetas</span>
                        </div>

                        <div className="CategoriasList">
                            {categorias.map(categoria => (
                                <NavButton text={categoria.nombre} redirectTo="Home" key={categoria.id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                                    </svg>
                                </NavButton>
                            ))}
                        </div>
                    </>
                }
                {props.children}
                {props.perfil ? null : <button className="ModalButtonMenuAdd Transition transition-all duration-300 z-50" onClick={''}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
                }
            </dialog>
        );
    } else {
        return null;
    }
}

export default PerfilModal;
