import express from 'express';
import {changeJobVisibility, changeApplicationStatus, getPostedJobs,getJobApplicants, postJob, getCompanyData, loginCompany, registerCompany } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middleware/authMiddleware.js';

const router = express.Router();

//Register a company
router.post('/register',upload.single('image'), registerCompany)

//Company login
router.post('/login', loginCompany)

//Get company data
router.get('/company', protectCompany, getCompanyData)

//Post a new job
router.post('/post-job',protectCompany, postJob)

//Get company job applicants
router.get('/applicants',protectCompany, getJobApplicants)

//get company job list
router.get('/list-jobs',protectCompany, getPostedJobs)

//change job application status
router.post('/change-status',protectCompany,changeApplicationStatus)

//change job visibility
router.post('/change-visibility',protectCompany, changeJobVisibility);

export default router;