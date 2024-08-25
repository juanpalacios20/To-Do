import './App.css'
import {BrowserRouter as Router} from 'react-router-dom' 
import AnimatedRoutes from './components/animatedRoutes/AnimatedRoutes'
import NavBar from './components/navBar/NavBar'

function App() {

  return (
    <Router>
      <NavBar/>
      <AnimatedRoutes/>
    </Router>
  )
}

export default App
