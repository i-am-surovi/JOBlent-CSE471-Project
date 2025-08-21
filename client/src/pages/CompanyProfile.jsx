// src/pages/CompanyProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CompanyProfile = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1485/api/recruiters/profile/${companyId}`
        );
        setCompany(res.data.recruiter); // recruiter = company
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchCompany();
  }, [companyId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!company) return <div className="text-center mt-10">Company not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow mt-6 rounded">
        <div className="flex items-center space-x-4">
          <img
            src={company.logo || "https://via.placeholder.com/80"}
            alt={company.name}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{company.company}</h1>
            <p className="text-gray-600">Contact: {company.phone || "N/A"}</p>
            <p className="text-gray-600">Email: {company.email || "N/A"}</p>
            <p className="text-gray-600">Recruiter: {company.name}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">About Company</h2>
          <p className="mt-2 text-gray-700">
            {/* Add company description if you have in your backend */}
            {company.description || "No description available."}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompanyProfile;
