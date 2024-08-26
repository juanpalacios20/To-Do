import { useState, useRef } from "react"

import PropTypes from 'prop-types'

function PerfilModal(props) {

    PerfilModal.propTypes = {
        state: PropTypes.bool.isRequired,
        toggleOff: PropTypes.func.isRequired,
        perfil: PropTypes.bool,
        children: PropTypes.object.isRequired
    };

    const [open, setOpen] = useState(false)
    const ref = useRef()


    function CloseModal() {
        props.toggleOff()
    }

    function Out() {
        ref.current.focus()
        setOpen(true)
    }

    function In() {
        setOpen(false)
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
                            <span className="ModalNombre text-5xl text-center">Carpeta</span>
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
        )
    } else {
        return null
    }
}

export default PerfilModal