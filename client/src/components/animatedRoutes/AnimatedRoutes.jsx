import { Navigate, Route, Routes, useLocation, } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy } from 'react'

// Estas son rutas dinamicas para hacer la carga de las paginas de forma diferida
const LazyHome = lazy(() => import('../pages/home/home'))


function AnimatedRoutes() {

    const location = useLocation()

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>

                {/* =============================== Rutas del home =============================== */}
                <Route path='/' element={<Navigate to='/Home' />} />
                <Route path='/Home' element={
                    <Suspense fallback={<div><h1 className='text-center text-9xl'>Cargando...</h1></div>}>
                        <LazyHome />
                    </Suspense>
                } />


            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes