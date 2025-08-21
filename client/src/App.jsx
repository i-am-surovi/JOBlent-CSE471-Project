import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ApplyJob from './pages/ApplyJob';
import Application from './pages/Application';
import Profile from './pages/Profile'; 
import RecruiterLogin from './components/RecruiterLogin';   // ✅ Correct folder
import PostJob from './pages/PostJob';
import CompanyProfile from './pages/CompanyProfile';   // ✅ Company profile
import { AppContext } from './context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { showRecruiterLogin } = useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Application />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/recruiter/login' element={<RecruiterLogin />} />
        <Route path='/recruiter/post-job' element={<PostJob />} />
        <Route path='/company/:companyId' element={<CompanyProfile />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
};

export default App;
