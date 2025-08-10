import React, {useContext, useRef} from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {

  const {setSearchFilter, setISSearched} = useContext(AppContext)

  const titleRef = useRef(null)
  const locationRef = useRef(null)

  const onSearch = () => {
    setSearchFilter(
        {
            title: titleRef.current.value,
            location: locationRef.current.value
        }
    )
    setISSearched(true)
  }

  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
      <div className='bg-gradient-to-r from-purple-700 to-purple-950 text-white py-16 text-center mx-4 rounded-xl relative'>
        {/* Recruiter Login Badge - Top Right */}
        <div className='absolute top-4 right-4'>
          <Link to="/recruiter/login">
            <button className='bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 transition duration-300'>
              🏢 For Recruiters
            </button>
          </Link>
        </div>

        <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 10,000+ jobs to apply</h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
        
        {/* Search Section */}
        <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto'>
            <div className='flex items-center'>
                <img src={assets.search_icon} alt="search" />
                <input 
                  type="text"
                  placeholder='Search For Jobs' 
                  className='max-sm:text-xs p-2 rounded outline-none w-full'
                  ref={titleRef}
                />
            </div>
            <div className='flex items-center'>
                <img className='h-4 sm:h-5' src={assets.location_icon} alt="location" />
                <input 
                  type="text"
                  placeholder='Location' 
                  className='max-sm:text-xs p-2 rounded outline-none w-full'
                  ref={locationRef}
                />
            </div>
            <button onClick={onSearch} className='bg-blue-600 px-6 py-2 rounded text-white m-1 hover:bg-blue-700 transition duration-200'>Search</button>
        </div>

        {/* Call-to-Action for Recruiters */}
        <div className='mt-8 text-center'>
          <p className='text-white/80 text-sm mb-3'>Looking to hire talent?</p>
          <Link to="/recruiter/login">
            <button className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300 transform hover:scale-105 shadow-lg'>
              Post Jobs & Find Candidates →
            </button>
          </Link>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex'>
        <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
            <p className='font-medium'>Trusted by</p>
            <img className='h-6' src={assets.microsoft_logo} alt='Microsoft' />
            <img className='h-6' src={assets.walmart_logo} alt='Walmart' />
            <img className='h-6' src={assets.accenture_logo} alt='Accenture' />
            <img className='h-6' src={assets.samsung_logo} alt='Samsung' />
            <img className='h-6' src={assets.amazon_logo} alt='Amazon' />
            <img className='h-6' src={assets.adobe_logo} alt='Adobe' />
        </div>
      </div>
    </div>
  )
}

export default Hero
