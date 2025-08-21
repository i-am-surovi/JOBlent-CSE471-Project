// server/server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

import recruiterRoutes from './routes/recruiterRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', // for dev; replace with your frontend URL in prod
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobportal')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: { origin: '*' } // replace '*' with frontend URL in prod
});

// Make io accessible in routes
app.set('io', io);

// Routes
app.use('/api/recruiters', recruiterRoutes);
console.log('✅ Recruiter routes loaded successfully');

app.use('/api/jobs', jobRoutes);
console.log('✅ Job routes loaded successfully');

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Job Portal API is running!',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 1485
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 1485;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

// Export for use in routes or tests
export { io, app, server };
