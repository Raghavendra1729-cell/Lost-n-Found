import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage, LoginPage, RegisterPage } from './pages'
import MyObjects from './pages/MyObjects'
import { UserProfile } from './components'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/my-objects" element={<MyObjects />} />
      </Routes>
    </Router>
  )
}

export default App
