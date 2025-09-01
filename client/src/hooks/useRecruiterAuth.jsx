// src/hooks/useRecruiterAuth.jsx
import { useState, useEffect } from 'react';
import { recruiterAuthService } from '../services/recruiterAuthService';

export const useRecruiterAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [recruiterData, setRecruiterData] = useState(null);
  const [authMode, setAuthMode] = useState('server');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = recruiterAuthService.isAuthenticated();
      const data = recruiterAuthService.getRecruiterData();
      const mode = recruiterAuthService.getAuthMode();
      
      setIsAuthenticated(authenticated);
      setRecruiterData(data);
      setAuthMode(mode);
      setLoading(false);
    };

    checkAuth();

    // Listen for storage changes (in case user logs out in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const logout = () => {
    recruiterAuthService.logout();
    setIsAuthenticated(false);
    setRecruiterData(null);
    setAuthMode('server');
  };

  return {
    isAuthenticated,
    recruiterData,
    authMode,
    loading,
    logout,
    isOnlineMode: authMode === 'server',
    isOfflineMode: authMode === 'local'
  };
};