// middleware/auth.js
const jwt = require('jsonwebtoken');
const Recruiter = require('../models/Recruiter');

const verifyRecruiter = async (req, res, next) => {
  try {
    const raw = req.headers['authorization'];
    if (!raw) return res.status(401).json({ message: 'No token provided' });

    const token = raw.split(' ')[1]; // "Bearer <token>"
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const recruiter = await Recruiter.findById(decoded.recruiterId);
    if (!recruiter) return res.status(401).json({ message: 'Recruiter not found' });

    req.recruiter = recruiter; // attach to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { verifyRecruiter };

