// routes/jobRoutes.js
import express from 'express';
const router = express.Router();
import Job from '../models/Job.js';

// Post a new job
router.post('/post', async (req, res) => {
  try {
    const job = await Job.create(req.body);

    // Emit new job notification to all clients
    req.io.emit('newJob', { _id: job._id, title: job.title });

    // Optional: Emit deadline reminder after some time (demo)
    setTimeout(() => {
      req.io.emit('deadlineReminder', { _id: job._id, title: job.title });
    }, 10000); // 10 seconds later

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
