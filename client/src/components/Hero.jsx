import React, { useContext, useRef } from "react";
import Navbar from "./Navbar";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import Marquee from "react-fast-marquee"; 

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value
    });
    setIsSearched(true);
  };

  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mc-4">
          Over 10,000+ jobs to apply
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        <div className="flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto">
          <div className="flex items-center">
            <img className="h-4 sm:h-5" src={assets.search_icon} alt="" />
            <input
              type="text"
              placeholder="Search for jobs"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
              ref={titleRef}
            />
          </div>
          <div className="flex items-center">
            <img className="h-4 sm:h-5" src={assets.location_icon} alt="" />
            <input
              type="text"
              placeholder="Location"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
              ref={locationRef}
            />
          </div>
          <button
            onClick={onSearch}
            className="bg-blue-600 rounded px-6 py-2 text-white m-1"
          >
            Search
          </button>
        </div>
      </div>

      {/* ✅ Trusted Companies Marquee */}
      <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md">
        <p className="font-medium mb-3">Trusted by</p>
        <Marquee pauseOnHover={true} speed={40}>
          <div className="flex justify-center gap-10 lg:gap-16 flex-wrap px-4">
            <a
              href="https://www.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <img className="h-6" src={assets.microsoft_logo} alt="Microsoft" />
            </a>
            <a
              href="https://www.walmart.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <img className="h-6" src={assets.walmart_logo} alt="Walmart" />
            </a>
            <a
              href="https://www.accenture.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <img className="h-6" src={assets.accenture_logo} alt="Accenture" />
            </a>
            <a
              href="https://www.samsung.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <img className="h-6" src={assets.samsung_logo} alt="Samsung" />
            </a>
            <a
              href="https://www.amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <img className="h-6" src={assets.amazon_logo} alt="Amazon" />
            </a>
            <a
              href="https://www.adobe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <img className="h-6" src={assets.adobe_logo} alt="Adobe" />
            </a>
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Hero;
