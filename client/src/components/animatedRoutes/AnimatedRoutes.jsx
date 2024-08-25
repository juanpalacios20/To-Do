import { Navigate, Route, Routes, useLocation, } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy } from 'react'

const LazyHome = lazy(() => import('../pages/home/Home.jsx'))
function AnimatedRoutes() {

    const location = useLocation()

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Navigate to='/Home' />} />
                <Route path='/Home' element={
                    <Suspense>
                        <LazyHome />
                    </Suspense>
                } />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes