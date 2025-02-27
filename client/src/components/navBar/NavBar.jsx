import DarkMode from "../darkMode/DarkMode"
import { lazy, Suspense, useState, useEffect, useRef } from "react"
import NavButton from "./NavButton.jsx"
import { PropTypes } from 'prop-types'
import { Link } from "react-router-dom"
import axios from 'axios'; // Asegúrate de tener axios instalado
import AgregarCategoria from "./AgregarCategoria.jsx"
const LazyModal = lazy(() => import("./PerfilModal.jsx"))

function NavBar(props) {

    NavBar.propTypes = {
        location: PropTypes.object.isRequired
    }

    const [perfilModal, setPerfilModal] = useState(false)
    const [menuModal, setMenuModal] = useState(false)
    const [newCategory, setNewCategory] = useState(false);
    const [categoriaActual, setCategoriaActual] = useState('Home');
    const FolderNameRef = useRef();

    function closePerfilModal() {
        setPerfilModal(false)
    }

    function closeMenuModal() {
        setMenuModal(false)
    }

    const handleSubmit = (event) => {
        console.log(event.target.value);
        // Aqui va el código para agregar la categoría al presionar el enter
        setNewCategory(false);
    }

    const handleCancel = (e) => {
        e.value = false;
        setNewCategory(false);
    }

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        if (menuModal) {
            axios.get('http://localhost:8000/categorias/obtener/')
                .then(response => {
                    setCategorias(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("Hubo un error al obtener las categorías:", error);
                });
        }

        categorias.filter(categoria => {
            if (location.pathname.includes(categoria.nombre)) {
                setCategoriaActual(categoria.nombre);
            }
        })

        FolderNameRef.current.innerText = categoriaActual

        console.log(location.pathname); // Imprime el valor de categoriaActual;

    }, [menuModal, location.pathname]);

    return (
        <>
            {/* ======================================= NavBar ======================================= */}
            <div className={props.location.pathname.includes("/Home") ? "NavBarContainerTasks transition-all duration-300" : (location.pathname ==="/Login" ? `${'hidden'}` : `${"NavBarContainerPerfil transition-all duration-300"}`)}>
                <div className="NavBar transition-all duration-300">
                    <div className="NavBarContent">
                        <div onClick={() => setMenuModal(true)} className="NavBarMenu hover:cursor-pointer Transition transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="NavBarMenuIcon size-20 ml-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <h2 ref={FolderNameRef} className="NavBarCarpeta ml-5 text-5xl font-semibold self-center"></h2>
                        </div>
                        <div className="NavBarLogo flex flex-row flex-nowrap">
                            <h1 className="NavBarText text-8xl font-extrabold">TaskFill</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="NavBarIcon size-20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                        </div>
                        {props.location.pathname.includes("/Home") ?
                            <div onClick={() => setPerfilModal(true)} className="NavBarPerfil ModalClose hover:cursor-pointer p-2 Transition transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="NavBarPerfilIcon size-16">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </div>
                            : (props.location.pathname === "/Perfil" ?
                                <div className="NavBarVolver hover:cursor-pointer my-auto Transition transition-all duration-300">
                                    <Link to={-1} className="NavBarVolverLink text-4xl font-bold">Volver</Link>
                                </div>
                                : null
                            )
                        }
                    </div>
                </div>

                {/* ======================================= Modales perezosos ======================================= */}
                <Suspense>
                    <LazyModal perfil state={perfilModal} toggleOff={closePerfilModal} >
                        <NavButton text="Perfil" redirectTo="Perfil" cerrar={closePerfilModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </NavButton>
                        <NavButton text="Cerrar sesión" redirectTo="Login">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 mr-2 text-red-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                            </svg>

                        </NavButton>
                    </LazyModal>
                </Suspense>
                <Suspense>
                    <LazyModal newCategory={newCategory} setNewCategory={setNewCategory} state={menuModal} toggleOff={closeMenuModal} >
                        <div className="CategoriasList">
                            {categorias.map(categoria => (
                                <NavButton text={categoria.nombre} redirectTo={`Home/${categoria.id}/${categoria.nombre}`} key={categoria.id} menu>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                                    </svg>
                                </NavButton>
                            ))}
                            <AgregarCategoria placeholder="Preciona esc para cancelar" open={newCategory} onKeyDown={
                                (e) => {
                                    if (e.key === 'Enter') {
                                        handleSubmit(e)
                                    } else if (e.key === 'Escape') {
                                        handleCancel(e)
                                    }
                                }} /*El input recibe cualquier atributo desde aqui*/ />
                        </div>
                    </LazyModal>
                </Suspense>
            </div >

            {/* ======================================= Dark Mode ======================================= */}
            < DarkMode />
        </>
    )
}

export default NavBar