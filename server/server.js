import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";

// Import your routes (make sure you have these files)
import jobRoutes from "./routes/jobRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// ----- Mount API Routes -----
app.use("/api/jobs", jobRoutes);
app.use("/api/interviews", interviewRoutes);

// ----- Create HTTP Server & Socket.IO -----
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend port
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ----- Socket.IO Connection -----
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // ----- Listen for new job posts from frontend -----
  socket.on("newJob", (jobData) => {
    console.log("New Job posted:", jobData);
    // Broadcast to all other connected clients
    socket.broadcast.emit("newJob", jobData);
  });

  // ----- Test Notifications (optional) -----
  setTimeout(() => {
    socket.emit("newJob", {
      _id: "test_job_1",
      title: "Frontend Developer Test Job",
    });
    console.log("Test newJob emitted");
  }, 5000);

  setTimeout(() => {
    socket.emit("deadlineReminder", {
      _id: "test_job_1",
      title: "Frontend Developer Deadline Test",
    });
    console.log("Test deadlineReminder emitted");
  }, 10000);

  setTimeout(() => {
    socket.emit("interviewInvite", {
      _id: "test_interview_1",
      position: "Frontend Developer Interview Test",
    });
    console.log("Test interviewInvite emitted");
  }, 15000);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// ----- Connect to MongoDB -----
const MONGO_URI = "mongodb://localhost:27017/jobportal"; // replace with your URI
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ----- Start Server -----
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { io };
