import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import CompanyPage from "./pages/CompanyPage";
import ApplyJobForm from "./pages/ApplyJobForm";
import Application from "./pages/Application";
import Profile from "./pages/Profile";
import RecruiterLogin from "./components/RecruiterLogin";

import { AppContext } from "./context/AppContext";
import { useRecruiterAuth } from "./hooks/useRecruiterAuth";

import RecruiterDashboard from "./pages/recruiterDashboard";
import ViewApplications from "./pages/ViewApplications";
import ManageJobs from "./pages/ManageJobs";
import PostJob from "./pages/PostJob";

import 'quill/dist/quill.snow.css';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useRecruiterAuth();

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
  return isAuthenticated ? <Navigate to="/dashboard/manage-jobs" replace /> : <RecruiterLogin />;
};

const App = () => {
  const { showRecruiterLogin } = useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />


        {/* ApplyJob page with dynamic id */}
        <Route path="/apply-job/:id" element={<ApplyJob />} />

        {/* Company profile page */}
        <Route path="/company/:id" element={<CompanyPage />} />

        
        
        <Route path="/apply-job-form/:id" element={<ApplyJobForm />} />

        {/* Other public pages */}
        <Route path="/applications" element={<Application />} />
        <Route path="/profile" element={<Profile />} />

        {/* Recruiter login */}
        <Route path="/recruiter-login" element={<RecruiterLoginPage />} />

        {/* Dashboard protected routes */}
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
          <Route path="post-job" element={<PostJob />} />
          <Route index element={<Navigate to="manage-jobs" replace />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
