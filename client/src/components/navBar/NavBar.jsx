import DarkMode from "../darkMode/DarkMode"
import { lazy, Suspense, useState } from "react"
import NavButton from "./NavButton.jsx"

const LazyModal = lazy(() => import("./PerfilModal.jsx"))

function NavBar() {

    const [perfilModal, setPerfilModal] = useState(false)
    const [menuModal, setMenuModal] = useState(false)

    function closePerfilModal() {
        setPerfilModal(false)
    }

    function closeMenuModal() {
        setMenuModal(false)
    }

    console.log(perfilModal)

    return (
        <>
            {/* ======================================= NavBar ======================================= */}
            <div className="NavBarContainer transition-all duration-300">
                <div className="NavBar transition-all duration-300">
                    <div className="NavBarContent">
                        <div onClick={() => setMenuModal(true)} className="NavBarMenu hover:cursor-pointer Transition transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="NavBarMenuIcon size-20 ml-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <h2 className="NavBarCarpeta ml-5 text-5xl font-semibold self-center">Objeto</h2>
                        </div>
                        <div className="NavBarLogo flex flex-row flex-nowrap">
                            <h1 className="NavBarText text-8xl font-extrabold">TaskFill</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="NavBarIcon size-20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                        </div>
                        <div onClick={() => setPerfilModal(true)} className="NavBarPerfil ModalClose hover:cursor-pointer p-2 Transition transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="NavBarPerfilIcon size-16">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* ======================================= Modales perezosos ======================================= */}
                <Suspense>
                    <LazyModal perfil state={perfilModal} toggleOff={closePerfilModal} >
                        <NavButton text="Perfil" redirectTo="perfil">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </NavButton>
                        <NavButton text="Cerrar sesión" redirectTo="logion">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 mr-2 text-red-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                            </svg>

                        </NavButton>
                    </LazyModal>
                </Suspense>
                <Suspense>
                    <LazyModal state={menuModal} toggleOff={closeMenuModal} >
                        {/* Aqui van las listas de botones de las carpetas */}
                    </LazyModal>
                </Suspense>
            </div >

            {/* ======================================= Dark Mode ======================================= */}
            < DarkMode />
        </>
    )
}

export default NavBar