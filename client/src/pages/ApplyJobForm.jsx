import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ApplyJobForm = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();

  const [hasApplied, setHasApplied] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
  });

  useEffect(() => {
    // Check localStorage on load if jobId is already applied
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setHasApplied(appliedJobs.includes(jobId));
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasApplied) return; // prevent multiple submits

    // TODO: Call backend API to submit application here

    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    if (!appliedJobs.includes(jobId)) {
      appliedJobs.push(jobId);
      localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
    }

    setHasApplied(true);

    alert("Application submitted successfully!");
    navigate("/"); // Redirect after submit
  };

  if (hasApplied) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-semibold mb-4">Already Applied</h2>
          <p className="mb-6">You have already applied for this job.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-lg shadow">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">
          Apply for Job
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* form fields: fullName, email, phone, resume, coverLetter */}
          {/* unchanged from your original code */}
          {/* ... */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
              Upload Resume (PDF) <span className="text-red-500">*</span>
            </label>
            <input
              id="resume"
              name="resume"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full text-gray-700"
            />
          </div>
          <div>
            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              rows={4}
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Write a brief cover letter..."
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-blue-600 px-10 py-3 text-white font-semibold text-lg hover:bg-blue-700 transition duration-300"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobForm;

