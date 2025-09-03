import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Bell } from "lucide-react";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user, isSignedIn } = useUser();
  const { notifications, setNotifications, setShowRecruiterLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const [openNotif, setOpenNotif] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const prevNotifCount = useRef(notifications.length);

  // Play short beep using Web Audio API
  const playBeep = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2); // 0.2 sec beep
  };

  // Highlight bell & play beep only when a new notification is added
  useEffect(() => {
    if (notifications.length > prevNotifCount.current) {
      setHighlight(true);
      playBeep();
      const timeout = setTimeout(() => setHighlight(false), 1500);
      return () => clearTimeout(timeout);
    }
    prevNotifCount.current = notifications.length;
  }, [notifications]);

  // Example: Subscribe to socket notifications
  useEffect(() => {
    const socket = window.socket; // assuming you attached socket to window
    if (!socket) return;

    // New job notification
    socket.on("newJob", (job) => {
      setNotifications((prev) => [
        ...prev,
        { type: "newJob", message: `New job posted: ${job.title}`, jobId: job._id },
      ]);
    });

    // Deadline reminder
    socket.on("deadlineReminder", (job) => {
      setNotifications((prev) => [
        ...prev,
        { type: "deadline", message: `Deadline approaching: ${job.title}`, jobId: job._id },
      ]);
    });

    // Interview invitation
    socket.on("interviewInvite", (interview) => {
      setNotifications((prev) => [
        ...prev,
        { type: "interview", message: `Interview scheduled: ${interview.position}`, interviewId: interview._id },
      ]);
    });

    return () => {
      socket.off("newJob");
      socket.off("deadlineReminder");
      socket.off("interviewInvite");
    };
  }, [setNotifications]);

  const handleNotificationClick = (notif) => {
    setOpenNotif(false);
    if (notif.type === "newJob" || notif.type === "deadline") {
      navigate(`/apply-job/${notif.jobId}`);
    } else if (notif.type === "interview") {
      navigate(`/interview/${notif.interviewId}`);
    }
  };

  return (
    <nav className="shadow py-4 bg-white">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="cursor-pointer h-10" />
        </Link>

        {isSignedIn ? (
          <div className="flex items-center gap-4 relative">
            {/* Notification Bell */}
            <div className="relative cursor-pointer">
              <Bell
                className={`w-6 h-6 cursor-pointer transition-transform duration-300 ${
                  highlight
                    ? "animate-bounce text-red-600"
                    : "text-gray-700 hover:text-red-600"
                }`}
                onClick={() => setOpenNotif(!openNotif)}
              />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 rounded-full animate-pulse">
                  {notifications.length}
                </span>
              )}

              {openNotif && (
                <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50">
                  <h3 className="px-4 py-2 border-b font-semibold text-gray-700">
                    Notifications
                  </h3>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((n, idx) => (
                      <div
                        key={idx}
                        className={`px-4 py-2 cursor-pointer flex items-center gap-2 hover:bg-gray-100 ${
                          n.type === "interview" ? "bg-blue-50" : ""
                        }`}
                        onClick={() => handleNotificationClick(n)}
                      >
                        {n.type === "interview" && <span className="text-blue-600">📅</span>}
                        <span
                          className={`${
                            n.type === "deadline"
                              ? "text-red-600"
                              : n.type === "interview"
                              ? "text-blue-700"
                              : "text-gray-700"
                          }`}
                        >
                          {n.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Links */}
            <Link to="/applications">Applied Jobs</Link>
            <span>|</span>
            <p className="max-sm:hidden">
              Hi, {user.firstName} {user.lastName}
            </p>
            <Link
              to="/profile"
              className="ml-4 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              My Profile
            </Link>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs items-center">
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="text-gray-600"
            >
              Recruiter Login
            </button>
            <button
              onClick={() => openSignIn()}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

