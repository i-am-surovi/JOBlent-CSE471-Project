import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const PostJob = () => {
  const { socket } = useContext(AppContext);

  const handlePostJob = () => {
    if (!socket) return;

    // Create a mock job object
    const newJob = {
      _id: "job_" + Date.now(),
      title: "New Job Posted: Frontend Developer",
    };

    // Emit the notification to all connected clients
    socket.emit("newJob", newJob);

    alert("Notification sent for new job!");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Post a New Job
      </h2>
      <p className="text-gray-500 text-center mb-6">
        Click the button below to post a job and notify users.
      </p>

      <div className="flex justify-center">
        <button
          onClick={handlePostJob}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Post Job
        </button>
      </div>
    </div>
  );
};

export default PostJob;
