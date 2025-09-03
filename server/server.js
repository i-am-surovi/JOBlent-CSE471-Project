import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import "./config/instrument.js"
 import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from './routes/jobRoutes.js'
import http from "http";
import { Server } from "socket.io";

// Initialize Express
const app = express();

// Import your routes (make sure you have these files)
import interviewRoutes from "./routes/interviewRoutes.js";

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
export { io };

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

// Connect to database
await connectDB();
await connectCloudinary()

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/jobs',jobRoutes)

// Routes
app.get("/", (req, res) => res.send("API Working"));
app.get("/debug-sentry", function mainHandler(req,res) {
  throw new Error("My first Sentry error!");
})
app.post('/webhooks', clerkWebhooks)
app.use('/api/company', companyRoutes)

// Port
const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
