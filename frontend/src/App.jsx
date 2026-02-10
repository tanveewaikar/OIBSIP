import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import login from './pages/login'
import AdminDashboard from './pages/AdminDashboard'
import Register from './pages/Register'
import UserDashboard from './pages/UserDashboard'
import NavBar from './components/NavBar'
export default function App() {
  return (
   <BrowserRouter>
   <NavBar/>
   <Routes>
   <Route path="/" element={<login/> }/>
   <Route path="/register" element={<Register/>}/>
   <Route path="/user" element={<UserDashboard/>}/>
   <Route path="/admin" element={<AdminDashboard/>}/>
   </Routes>
   </BrowserRouter>
  )
}
