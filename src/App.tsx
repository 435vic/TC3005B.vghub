import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Dashboard from './pages/Dashboard'
import NavBar from './components/Navbar/Navbar'

export default function App() {
  return <>
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route index element={<Home/>}/>  
        <Route path="dashboard" element={<Dashboard/>}/> 
        <Route path="profile" element={<Profile/>}/> 
        <Route path="search" element={<Search/>}/> 
      </Routes>
    </BrowserRouter>
  </>
}

