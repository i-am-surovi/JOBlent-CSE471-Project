import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const CompanyPage = () => {
  const { id } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const { jobs } = useContext(AppContext);

  const fetchCompany = async () => {
    setCompanyData({
      _id: id,
      name: "Webflow",
      image: assets.company_icon,
      location: "Dhaka, Bangladesh",
      employees: "100-1,000",
      about:
        "Webflow is a leading no-code visual development platform that empowers individuals and teams to design, build, and launch responsive websites without writing a single line of code. Our mission is to democratize web development and give people the tools to bring their ideas to life. At Webflow, we combine powerful engineering with intuitive design, helping businesses and creators build for the web faster and smarter.",
      mission:
        "We foster a remote-first, inclusive environment that supports innovation, work-life balance, and professional growth. With a global team and a customer base that includes startups and Fortune 500 companies, Webflow is reshaping how the web is built.",
      whyWorkWithUs: [
        "We're at the forefront of the no-code revolution.",
        "Remote-friendly with flexible schedules.",
        "Focused on building high-impact, user-friendly products.",
        "Transparent and collaborative work culture.",
        "Growth-oriented; we invest in our people.",
      ],
      benefits: [
        "Empower millions of creators, entrepreneurs, and teams across the world with intuitive, flexible tools that accelerate innovation.",
        "Accessible tools for building world-class websites without writing code.",
      ],
      vision:
        "Our vision is to revolutionize how the web is built by removing barriers between imagination and creation, giving everyone the power to design and launch websites without code.",
      websiteUrl: "https://webflow.com",
    });
  };

  useEffect(() => {
    fetchCompany();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id, jobs]);

  return companyData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="border-b border-gray-200 mb-4"></div>

        {/* Company Header */}
        <div className="relative flex flex-col items-center px-6 py-8 md:flex-row md:items-start bg-white rounded-lg p-6 shadow-md">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <img
              className="h-24 w-24 bg-white rounded-lg p-3 border shadow-md flex-shrink-0 z-10"
              src={companyData.image}
              alt={`${companyData.name} Logo`}
            />
            <div className="text-center md:text-left md:ml-6 mt-4 md:mt-0">
              <h1 className="text-3xl font-bold text-neutral-800">
                {companyData.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-gray-600 mt-2 text-sm">
                <span className="flex items-center gap-1">
                  <img
                    src={assets.location_icon}
                    alt="location icon"
                    className="h-4 w-4"
                  />
                  {companyData.location || "N/A"}
                </span>
                <span className="flex items-center gap-1">
                  <img
                    src={assets.person_icon}
                    alt="employees icon"
                    className="h-4 w-4"
                  />
                  {companyData.employees || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div className="px-6 py-8 md:px-14 lg:px-20 grid grid-cols-1 lg:grid-cols-1 gap-10 items-start mt-10">
          {/* About Us Section */}
          <section>
            <h2 className="font-bold text-2xl mb-4 text-neutral-800">
              About Us
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-4">
              {companyData.about || "N/A"}
            </p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {companyData.mission || "N/A"}
            </p>
          </section>

          {/* Why Work With Us */}
          <section>
            <h2 className="font-bold text-2xl mb-4 text-neutral-800">
              Why Work With Us?
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {companyData.whyWorkWithUs?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Benefits & Perks */}
          <section>
            <h2 className="font-bold text-2xl mb-4 text-neutral-800">
              Benefits & Perks
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {companyData.benefits?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Company Vision */}
          <section>
            <h2 className="font-bold text-2xl mb-4 text-neutral-800">
              Company Vision
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {companyData.vision || "N/A"}
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CompanyPage;
