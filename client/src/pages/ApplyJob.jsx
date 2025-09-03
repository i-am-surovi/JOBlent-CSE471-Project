import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import kconvert from "k-convert";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";

const ApplyJob = () => {
  const { id } = useParams();
  const [JobData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);
  const navigate = useNavigate();

  const [hasApplied, setHasApplied] = useState(false);

  const fetchJob = async () => {
    const data = jobs.filter((job) => job._id === id);
    if (data.length !== 0) {
      setJobData(data[0]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (jobs.length > 0) fetchJob();

    // Check localStorage for applied jobs
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setHasApplied(appliedJobs.includes(id));
  }, [id, jobs]);

  const handleApplyNow = () => {
    if (!hasApplied && JobData) {
      navigate(`/apply-job-form/${JobData._id}`);
    }
  };

  if (!JobData) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="bg-white text-black rounded-lg w-full">
          {/* Job Header Section */}
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border"
                src={JobData.companyId.image}
                alt=""
              />
              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-2xl sm:text-4xl font-medium">{JobData.title}</h1>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="" />
                    {JobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="" />
                    {JobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} alt="" />
                    {JobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.money_icon} alt="" />
                    CTC: {kconvert.convertTo(JobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons Section */}
            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <div className="flex flex-wrap justify-end max-md:justify-center gap-2">
                {/* Button changes based on hasApplied */}
                <button
                  className={`p-2.5 px-10 rounded ${
                    hasApplied ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white"
                  }`}
                  onClick={handleApplyNow}
                  disabled={hasApplied}
                >
                  {hasApplied ? "Already Applied" : "Apply Now"}
                </button>

                <Link
                  to={`/company/${JobData.companyId._id}`}
                  state={{ from: `/apply-job/${JobData._id}` }}
                >
                  <button className="bg-blue-600 p-2.5 px-10 text-white rounded">
                    View Website
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Job Description & More Jobs */}
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-4">Job description</h2>
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: JobData.description }}
              ></div>

              {/* Bottom button too */}
              <button
                className={`p-2.5 px-10 rounded mt-10 ${
                  hasApplied ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white"
                }`}
                onClick={handleApplyNow}
                disabled={hasApplied}
              >
                {hasApplied ? "Already Applied" : "Apply Now"}
              </button>
            </div>

            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
              <h2 className="font-bold">More jobs from {JobData.companyId.name}</h2>
              {jobs
                .filter(
                  (job) =>
                    job._id !== JobData._id &&
                    job.companyId._id === JobData.companyId._id
                )
                .slice(0, 4)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ApplyJob;


