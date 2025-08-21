// routes/jobRoutes.js
import express from 'express';
import Job from '../models/Job.js';
import { verifyRecruiter } from '../middleware/auth.js';

const router = express.Router();

/** ---------- CREATE new job ---------- */
router.post('/', verifyRecruiter, async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      description,
      requirements,
      salary,
      jobType,
      experienceLevel,
      category,
      applicationDeadline
    } = req.body;

    const job = new Job({
      title,
      company,
      location,
      description,
      requirements,
      salary,
      jobType,
      experienceLevel,
      category,
      recruiterId: req.recruiter._id,  // ← from token
      applicationDeadline
    });

    const savedJob = await job.save();

    // Emit realtime notification to all clients
    const io = req.app.get('io');
    io?.emit('newJob', savedJob);

    return res.status(201).json({
      message: 'Job created successfully',
      job: savedJob
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

/** ---------- GET all jobs (with recruiter populated) ---------- */
router.get('/', async (req, res) => {
  try {
    const { title, location, category, jobType, page = 1, limit = 10 } = req.query;

    const filter = {}; // ✅ removed isActive since not all schemas have it
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (category) filter.category = { $regex: category, $options: 'i' };
    if (jobType) filter.jobType = jobType;

    const jobs = await Job.find(filter)
      .populate('recruiterId', 'name email company logo') // ✅ always populate recruiter
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const total = await Job.countDocuments(filter);

    res.json({
      message: 'Jobs retrieved successfully',
      jobs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalJobs: total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** ---------- GET single job by ID (with recruiter populated) ---------- */
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('recruiterId', 'name email company phone logo');

    if (!job) return res.status(404).json({ message: 'Job not found' });

    res.json({ message: 'Job retrieved successfully', job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
