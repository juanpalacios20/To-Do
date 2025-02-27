import './App.css'
import {BrowserRouter as Router} from 'react-router-dom' 
import AnimatedRoutes from './components/animatedRoutes/AnimatedRoutes'


function App() {

  return (
    <Router>
      <AnimatedRoutes/>
    </Router>
  )
}

export default App
