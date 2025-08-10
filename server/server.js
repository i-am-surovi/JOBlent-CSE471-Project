// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobportal')
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log('MongoDB connection error:', err));

// Add recruiter routes (working)
const recruiterRoutes = require('./routes/recruiterRoutes');
app.use('/api/recruiters', recruiterRoutes);
console.log('Recruiter routes loaded successfully');

// Add job routes (this will likely crash)
console.log('Loading job routes...');
const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);
console.log('Job routes loaded successfully');

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ 
        message: 'Job Portal API is running!',
        timestamp: new Date().toISOString(),
        port: 1485
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = 1485;
app.listen(PORT, () => {
    console.log(`✅ Server running successfully on port ${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});