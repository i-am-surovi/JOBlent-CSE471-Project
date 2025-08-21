// src/context/AppContext.jsx
import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jobsData } from '../assets/assets';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // === Your existing states ===
  const [searchFilter, setSearchFilter] = useState({
    title: '',
    location: '',
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  // === New state for notifications ===
  const [notifications, setNotifications] = useState([]);

  // === Fetch jobs (from static data for now) ===
  const fetchJobs = async () => {
    setJobs(jobsData);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // === Setup socket.io ===
  useEffect(() => {
    const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:1485', {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('newJob', (job) => {
      setNotifications((prev) => [job, ...prev]);
      setJobs((prev) => [job, ...prev]); // also add the job to jobs list
      toast.info(`New job: ${job.title} @ ${job.company}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // === Setup axios base URL globally ===
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:1485';

  // === Value exposed to all components ===
  const value = {
    searchFilter, setSearchFilter,
    isSearched, setIsSearched,
    jobs, setJobs,
    showRecruiterLogin, setShowRecruiterLogin,
    notifications, setNotifications,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
