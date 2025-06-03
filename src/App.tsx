import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Dashboard from './pages/Dashboard'
import GameDetails from './pages/GameDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import NavBar from './components/Navbar/Navbar'

export default function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route index element={<Home/>}/>  
        <Route path="dashboard" element={<Dashboard/>}/> 
        <Route path="profile" element={<Profile/>}/> 
        <Route path="search" element={<Search/>}/> 
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="game/:id" element={<GameDetails/>}/>
      </Routes>
    </BrowserRouter>
  )
}

