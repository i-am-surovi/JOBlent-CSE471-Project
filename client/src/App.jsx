// src/App.jsx
import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Application from './pages/Application'
import Profile from './pages/Profile' 
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'

const App = () => {
  const {showRecruiterLogin} = useContext(AppContext)
  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin/>}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/apply-job/:id' element={<ApplyJob />}/>
        <Route path='/applications' element={<Application />}/>
        <Route path='/profile' element={<Profile />}/> {/* ⬅ New route */}
      </Routes>
    </div>
  )
}

export default App
