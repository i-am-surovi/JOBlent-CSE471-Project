import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import JobListing from '../components/JobListing.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <JobListing />
        <Footer/>
    </div>
  )
}

export default Home