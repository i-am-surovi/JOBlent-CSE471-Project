import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import ApplyJobForm from "./pages/ApplyJobForm";
import Application from "./pages/Application";
import Profile from "./pages/Profile";
import RecruiterLogin from "./components/RecruiterLogin";

import { AppContext } from "./context/AppContext";
import { useRecruiterAuth } from "./hooks/useRecruiterAuth";

import RecruiterDashboard from "./pages/recruiterDashboard";
import ViewApplications from "./pages/ViewApplications";
import ManageJobs from "./pages/ManageJobs";

import 'quill/dist/quill.snow.css';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useRecruiterAuth();
  
  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Checking authentication...</span>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/recruiter-login" replace />;
};

const RecruiterLoginPage = () => {
  const { isAuthenticated } = useRecruiterAuth();
  
  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <RecruiterLogin />;
};

const App = () => {
  const { showRecruiterLogin } = useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/apply-job-form/:id" element={<ApplyJobForm />} />
        <Route path="/applications" element={<Application />} />
        <Route path="/profile" element={<Profile />} />

        {/* Recruiter login route with auto-redirect if authenticated */}
        <Route path="/recruiter-login" element={<RecruiterLoginPage />} />

        {/* Dashboard and nested protected routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <RecruiterDashboard />
            </PrivateRoute>
          }
        >
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
          {/* When visiting "/dashboard", redirect to "/dashboard/manage-jobs" */}
          <Route index element={<Navigate to="manage-jobs" replace />} />
        </Route>

        {/* Redirect any undefined route to home instead of recruiter login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;





