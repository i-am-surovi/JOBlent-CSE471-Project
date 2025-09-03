import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job, onSave }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setIsSaved(savedJobs.includes(job._id));
  }, [job._id]);

  const handleToggleSave = (e) => {
    e.stopPropagation();
    let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    if (isSaved) {
      // Unsave: remove from savedJobs
      savedJobs = savedJobs.filter(id => id !== job._id);
      setIsSaved(false);
    } else {
      // Save: add to savedJobs
      savedJobs.push(job._id);
      setIsSaved(true);
    }
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    if (onSave) onSave();
  };

  const handleNavigate = (url) => {
    navigate(url);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className={`border border-gray-200 p-6 shadow rounded relative ${isSaved ? "ring ring-yellow-400" : ""}`}>
      <div className='flex justify-between items-center'>
        <img className='h-8' src={assets.company_icon} alt='Company Logo' />
        <button
          onClick={handleToggleSave}
          className={`ml-2 px-2 py-1 rounded text-xs font-semibold 
            ${isSaved ? "bg-yellow-300 text-yellow-900" : "bg-gray-200 text-gray-600 hover:bg-yellow-200"}`}
        >
          {isSaved ? "★ Unsave" : "☆ Save Job"}
        </button>
      </div>
      <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
      <div className='flex items-center gap-3 mt-2 text-xs'>
        <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>{job.location}</span>
        <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded'>{job.level}</span>
      </div>
      <p
        className='text-gray-500 text-sm mt-4'
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>
      <div className='mt-4 flex gap-4 text-sm'>
        <button
          onClick={() => handleNavigate(`/apply-job/${job._id}`)}
          className='bg-blue-600 text-white px-4 py-2 rounded'
        >
          Apply now
        </button>
      </div>
    </div>
  );
};

export default JobCard;



