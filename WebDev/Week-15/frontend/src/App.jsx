import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import DashboardPage from './pages/DashboardPage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<div>welcome.</div>} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

export default App
