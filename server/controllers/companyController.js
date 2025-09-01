import Company from '../models/Company.js';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import generateToken from '../utils/generateToken.js';

export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imagefile = req.file;

  if (!name || !email || !password || !imagefile) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.json({ success: false, message: "Company already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imagefile.path);
    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error('Error in registerCompany:', error);
    res.status(500).json({ success: false, message: "Error occurred", error: error.message });
  }
};

export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });

    if (!company) {
      return res.json({ success: false, message: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, company.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Email or Password" });
    }

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error('Error in loginCompany:', error);
    res.status(500).json({ success: false, message: "Error occurred", error: error.message });
  }
};


//Get company data

export const getCompanyData = async (req,res) => {


}

//Post a new job
export const postJob = async (req,res) => {

    const{ title, description, location, salary } = req.body;

    const companyId = req.company._id;
    console.log(companyId),{title, description, location, salary};

}

//Get company job applicants
export const getJobApplicants = async (req,res) => {

}

//get company posted jobs
export const getPostedJobs = async (req,res) => {

}

//change job application status
export const changeApplicationStatus = async (req,res) => {

}

//change job visibility
export const changeJobVisibility = async (req,res) => {

}