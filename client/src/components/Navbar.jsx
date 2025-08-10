import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { UserButton, useUser, SignInButton, SignedIn, SignedOut, useClerk } from '@clerk/clerk-react'

const Navbar = () => {

  const {openSignIn} = useClerk()
  const { user } = useUser()

  return (
    <div className="shadow-2xl py-4 bg-gray-200 border-b border-gray-400 relative z-10">
      <div className="max-w-7xl px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="h-10" />
        </Link>
        
        <div className="flex gap-8 items-center">
          {/* Updated Recruiter Login Button with proper navigation */}
          <Link to="/recruiter/login">
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-200">
              Recruiter Login
            </button>
          </Link>
          
          {/* Show different buttons based on authentication state */}
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition duration-200">
                Login
              </button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <div className="flex items-center gap-4">
              <Link to={'/applications'} className="hover:text-blue-600 transition duration-200">
                Applied Jobs
              </Link>
              <span>Welcome, {user?.firstName || 'User'}!</span>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  )
}

export default Navbar