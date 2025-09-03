import { createContext, useEffect, useState } from "react";
import socket from "../utils/socket"; // 👈 shared socket
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);

    // Play sound (optional)
    const audio = new Audio("/notification.mp3");
    audio.play().catch(() => console.warn("Audio playback failed"));
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("✅ Connected to server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from server");
    });

    socket.on("newJob", (job) => {
      addNotification({
        type: "newJob",
        message: `New job posted: ${job.title}`,
        jobId: job._id,
      });
    });

    socket.on("deadlineReminder", (job) => {
      addNotification({
        type: "deadline",
        message: `Deadline approaching: ${job.title}`,
        jobId: job._id,
      });
    });

    socket.on("interviewInvite", (notif) => {
      addNotification({
        type: "interview",
        message: `Interview invitation: ${notif.position || notif.message}`,
        interviewId: notif._id,
      });
    });

    // Cleanup
    return () => {
      socket.off("newJob");
      socket.off("deadlineReminder");
      socket.off("interviewInvite");
    };
  }, []);

  // Job Search
  const [searchFilter, setSearchFilter] = useState({ title: "", location: "" });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(jobsData);
  }, []);

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  return (
    <AppContext.Provider
      value={{
        notifications,
        addNotification,
        socket,
        searchFilter,
        setSearchFilter,
        isSearched,
        setIsSearched,
        jobs,
        setJobs,
        showRecruiterLogin,
        setShowRecruiterLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
