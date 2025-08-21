import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate, Link } from 'react-router-dom' 

const JobCard = ({ job }) => {
  const navigate = useNavigate()

  return (
    <div className='border border-gray-200 p-6 shadow rounded'>
      <div className='flex justify-between items-center'>
        {/* ✅ Safely check recruiterId before rendering */}
        {job?.recruiterId ? (
          <Link to={`/company/${job?.recruiterId?._id}`}>
            <img
              src={job?.recruiterId?.logo || assets.company_icon}
              alt={job?.recruiterId?.company || "Company Logo"}
              className='w-12 h-12 rounded-full cursor-pointer'
            />
          </Link>
        ) : (
          <img
            src={assets.company_icon}
            alt="Default Company"
            className='w-12 h-12 rounded-full'
          />
        )}
      </div>

      <h4 className='font-medium text-xl mt-2'>{job.title}</h4>

      <div className='flex items-center gap-3 mt-2 text-xs'>
        <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
          {job.location}
        </span>
        <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
          {job.level}
        </span>
      </div>

      {/* ✅ Prevent crash if description is missing */}
      <p
        className='text-gray-500 text-sm mt-4'
        dangerouslySetInnerHTML={{
          __html: job?.description
            ? job.description.slice(0, 150)
            : "No description available",
        }}
      ></p>

      <div className='mt-4 flex gap-4 text-sm'>
        <button
          onClick={() => {navigate(`/apply-job/${job._id}`); scrollTo(0,0)}}
          className='bg-blue-600 text-white px-4 py-2 rounded'
        >
          Apply now
        </button>
        <button
          onClick={() => {navigate(`/apply-job/${job._id}`); scrollTo(0,0)}}
          className='text-gray-500 border border-gray-500 rounded px-4 py-2'
        >
          Learn more
        </button>
      </div>

      {/* ✅ Show recruiter name safely */}
      <h3 className="text-sm text-gray-500 mt-3">
        Posted by: {job?.recruiterId?.name || "Unknown Recruiter"}
      </h3>
    </div>
  )
}

export default JobCard

