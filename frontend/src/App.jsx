
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import Register from './pages/Register'
import UserDashboard from './pages/UserDashboard'
import NavBar from './components/NavBar'
import PizzaBuilder from './pages/PizzaBuilder'
import ProtectedRoute from './components/ProtectedRoute'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

export default function App() {
  return (
   <BrowserRouter>
   <NavBar/>
   <div className='container mt-5 pt-5'>
   <Routes>
   <Route path="/" element={<Login/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/register" element={<Register/>}/>
   <Route path="/user" element={<ProtectedRoute role ="user"><UserDashboard/></ProtectedRoute>}/>
   <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard/></ProtectedRoute>}/>
   <Route path="/pizza" element={<PizzaBuilder/>}/>
   <Route path="/forgot-password" element={<ForgotPassword/>}/>
   <Route path="/reset-password/:token" element={<ResetPassword/>}/>
   </Routes>
   </div>
   </BrowserRouter>
  )
}
