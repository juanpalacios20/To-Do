import { Navigate, Route, Routes, useLocation, } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy } from 'react'
import NavBar from '../navBar/NavBar'

// Estas son rutas dinamicas para hacer la carga de las paginas de forma diferida
const LazyHome = lazy(() => import('../pages/home/home'))
const LazyPerfil = lazy(() => import('../pages/Perfil/Perfil'))

function AnimatedRoutes() {

    const location = useLocation()

    return (
        <>
            <NavBar location={location} />
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>

                    {/* =============================== Rutas del home =============================== */}
                    <Route path='/' exact element={<Navigate to='/Home' />} />
                    <Route path='/Home' exact caseSensitive={true} element={
                        <Suspense fallback={<div><h1 className='text-center text-9xl'>Cargando...</h1></div>}>
                            <LazyHome />
                        </Suspense>
                    } />
                    <Route path='/Perfil' exact caseSensitive={true} element={
                        <Suspense fallback={<div><h1 className='text-center text-9xl'>Cargando...</h1></div>}>
                            <LazyPerfil />
                        </Suspense>
                    } />
                </Routes>
            </AnimatePresence>
        </>
    )
}

export default AnimatedRoutes