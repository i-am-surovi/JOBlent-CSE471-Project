import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useRecruiterAuth } from '../hooks/useRecruiterAuth';

const Sidebar = () => (
  <div className="w-60 h-screen bg-white border-r flex flex-col py-8 px-6">
    <h1 className="text-3xl font-bold mb-12">Insider<span className="text-blue-700">jobs</span></h1>
    <nav className="flex flex-col gap-4">
      <NavLink
        to="/dashboard/manage-jobs"
        className={({ isActive }) => 
          `px-4 py-3 rounded cursor-pointer hover:bg-blue-50 transition-colors ${
            isActive ? 'bg-blue-100 font-semibold text-blue-700' : 'text-gray-700'
          }`
        }
      >
        Manage Jobs
      </NavLink>
      <NavLink
        to="/dashboard/view-applications"
        className={({ isActive }) => 
          `px-4 py-3 rounded cursor-pointer hover:bg-blue-50 transition-colors ${
            isActive ? 'bg-blue-100 font-semibold text-blue-700' : 'text-gray-700'
          }`
        }
      >
        View Applications
      </NavLink>
    </nav>
  </div>
);

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const { recruiterData, authMode, logout } = useRecruiterAuth();

  const handleLogout = () => {
    logout(); // Use the logout method from the auth service
    navigate("/");  // Redirect to homepage on logout
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-700">Recruiter Dashboard</h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-gray-600">
                Welcome, {recruiterData?.name || 'Recruiter'}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                authMode === 'local' 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'bg-green-100 text-green-600'
              }`}>
                {authMode === 'local' ? 'Offline' : 'Online'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </header>
        <section className="flex-1 overflow-auto p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default RecruiterDashboard;





