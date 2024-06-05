import './App.css'
import { NavBar } from './components/NavBar/NavBar.jsx'
import { MisTurnos } from './views/MisTurnos/MisTurnos.jsx'
import { Home } from './views/Home/Home.jsx'
import { Register } from './views/Register/Register.jsx'
import { Login } from './views/Login/Login.jsx'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CreateTurns } from './views/Contacto/createTurn.jsx'


function App() {
  const location = useLocation()
  
  return(
    <>
      <NavBar/>
      
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/turnos' element={<MisTurnos/>}/>
        <Route path='/contacto' element={<CreateTurns/>}/>
      </Routes>

      
    </>
  )
}

export default App
