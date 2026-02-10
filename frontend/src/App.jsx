import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import Register from './pages/Register'
import UserDashboard from './pages/UserDashboard'
import NavBar from './components/NavBar'
import PizzaBuilder from './pages/PizzaBuilder'
export default function App() {
  return (
   <BrowserRouter>
   <NavBar/>
   <Routes>
   <Route path="/" element={<Login/>}/>
   <Route path="/register" element={<Register/>}/>
   <Route path="/user" element={<UserDashboard/>}/>
   <Route path="/admin" element={<AdminDashboard/>}/>
   <Route path="/pizza" element={<PizzaBuilder/>}/>
   </Routes>
   </BrowserRouter>
  )
}
