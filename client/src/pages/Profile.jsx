import React, { useRef, useState, useEffect } from "react";
import { assets } from "../assets/assets";

const PROFILE_STORAGE_KEY = "userProfileData";

const Profile = () => {
  const fileInputRef = useRef(null);

  const [personal, setPersonal] = useState({
    fullName: "",
    phone: "",
    address: "",
    dob: "",
    avatar: "",
  });

  const [education, setEducation] = useState({
    schoolName: "",
    schoolPassingYear: "",
    schoolGPA: "",
    collegeName: "",
    collegePassingYear: "",
    collegeGPA: "",
    degreeInstitution: "",
    degreeName: "",
    degreePassingYear: "",
    degreeCGPA: "",
  });

  const [professional, setProfessional] = useState({
    experience: "",
    skills: "",
    resume: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY));
    if (saved) {
      setPersonal(saved.personal || personal);
      setEducation(saved.education || education);
      setProfessional(saved.professional || professional);
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    if (section === "personal") {
      setPersonal({ ...personal, [name]: value });
    } else if (section === "education") {
      setEducation({ ...education, [name]: value });
    } else {
      setProfessional({ ...professional, [name]: value });
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonal((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify({
        personal,
        education,
        professional,
      })
    );
    alert("Profile saved!");
  };

  return (
    <div className="container mx-auto max-w-3xl p-6">
      {/* Logo at the top */}
      <div className="flex justify-center mb-6">
        <img src={assets.logo} alt="Logo" className="h-12" />
      </div>

      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow p-8 mb-8 flex items-center gap-6">
        <div className="relative group">
          <img
            src={
              personal.avatar ||
              "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
            }
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-blue-300 object-cover cursor-pointer shadow hover:brightness-90 transition"
            onClick={() => fileInputRef.current.click()}
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
          <span className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded cursor-pointer opacity-80 group-hover:opacity-100">
            Change
          </span>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-blue-700 mb-1">
            {personal.fullName || "Your Name"}
          </h2>
          <p className="text-blue-500">{personal.address || "Your address here"}</p>
          <span className="inline-block text-sm bg-blue-200 rounded px-3 py-1 text-blue-800 mt-2">
            {personal.phone || "Phone number"}
          </span>
        </div>
      </div>

      {/* Full Editable Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Details */}
        <div className="bg-white shadow rounded-lg px-6 py-4">
          <h3 className="text-lg font-bold text-blue-700 mb-4">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-1" htmlFor="fullName">Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                value={personal.fullName}
                onChange={e => handleChange(e, "personal")}
                className="border p-2 rounded bg-blue-50 w-full font-semibold"
              />
            </div>
            {/* Phone Field */}
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-1" htmlFor="phone">Phone No</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone Number"
                value={personal.phone}
                onChange={e => handleChange(e, "personal")}
                className="border p-2 rounded bg-blue-50 w-full font-semibold"
              />
            </div>
            {/* Address Field */}
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-1" htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={personal.address}
                onChange={e => handleChange(e, "personal")}
                className="border p-2 rounded bg-blue-50 w-full font-semibold"
              />
            </div>
            {/* DOB Field */}
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-1" htmlFor="dob">Birth Date</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={personal.dob}
                onChange={e => handleChange(e, "personal")}
                className="border p-2 rounded bg-blue-50 w-full font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white shadow rounded-lg px-6 py-4">
          <h3 className="text-lg font-bold text-purple-700 mb-4">Education Background</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* School */}
            <div className="border p-4 rounded bg-purple-50">
              <h4 className="font-semibold mb-2 text-purple-600">School</h4>
              <label className="block text-sm font-semibold text-purple-700 mb-1" htmlFor="schoolName">Institution</label>
              <input
                type="text"
                id="schoolName"
                name="schoolName"
                placeholder="School Name"
                value={education.schoolName}
                onChange={e => handleChange(e, "education")}
                className="border p-2 rounded mb-2 bg-purple-100 w-full font-semibold"
              />
              <label className="block text-sm font-semibold text-purple-700 mb-1" htmlFor="schoolPassingYear">Passing Year</label>
              <input
                type="number"
                id="schoolPassingYear"
                name="schoolPassingYear"
                placeholder="Passing Year"
                value={education.schoolPassingYear}
                onChange={e => handleChange(e, "education")}
                className="border p-2 rounded mb-2 bg-purple-100 w-full font-semibold"
              />
              <label className="block text-sm font-semibold text-purple-700 mb-1" htmlFor="schoolGPA">GPA</label>
              <input
                type="text"
                id="schoolGPA"
                name="schoolGPA"
                placeholder="GPA"
                value={education.schoolGPA}
                onChange={e => handleChange(e, "education")}
                className="border p-2 rounded bg-purple-100 w-full font-semibold"
              />
            </div>
            {/* College */}
            <div className="border p-4 rounded bg-purple-50">
              <h4 className="font-semibold mb-2 text-purple-600">College</h4>
              <label className="block text-sm font-semibold text-purple-700 mb-1" htmlFor="collegeName">Institution</label>
              <input
                type="text"
                id="collegeName"
                name="collegeName"
                placeholder="College Name"
                value={education.collegeName}
                onChange={e => handleChange(e, "education")}
                className="border p-2 rounded mb-2 bg-purple-100 w-full font-semibold"
              />
              <label className="block text-sm font-semibold text-purple-700 mb-1" htmlFor="collegePassingYear">Passing Year</label>
              <input
                type="number"
                id="collegePassingYear"
                name="collegePassingYear"
                placeholder="Passing Year"
                value={education.collegePassingYear}
                onChange={e => handleChange(e, "education")}
                className="border p-2 rounded mb-2 bg-purple-100 w-full font-semibold"
              />
              <label className="block text-sm font-semibold text-purple-700 mb-1" htmlFor="collegeGPA">GPA</label>
              <input
                type="text"
                id="collegeGPA"
                name="collegeGPA"
                placeholder="GPA"
                value={education.collegeGPA}
                onChange={e => handleChange(e, "education")}
                className="border p-2 rounded bg-purple-100 w-full font-semibold"
              />
            </div>
            {/* Degree */}
            <div className="border p-4 rounded bg-purple-50">
              <h4 className="font-semibold mb-2 text-purple-600">Degree</h4>
              <label className="block text-sm font-semibold text-purple-700 mb-1" htmlFor="degreeInstitution">Institution</label>
              <input
                type="text"
                id="degreeInstitution"
                name="degreeInstitution"
                placeholder="Institutional Name"
                value={education.degreeInstitution}
                onChange={e => handleChange(e, "education")}
                className="border p-2 rounded mb-2 bg-purple-100 w-full font-semibold"
              />
              <label className="block text-sm font-semibold text-purple-700 mb-1" htmlFor="degreeName">Degree Name</label>
              <input
                type="text"
                id="degreeName"
                name="degreeName"
                placeholder="Degree Name (e.g., B.Sc. in Computer Science)"
                value={education.degreeName}
                onChange={e => handleChange(e, "education")}
                className="border p-2 rounded mb-2 bg-purple-100 w-full font-semibold"
              />
              <label className="block text-sm font-semibold text-purple-700 mb-1" htmlFor="degreePassingYear">Passing Year</label>
              <input
                type="number"
                id="degreePassingYear"
                name="degreePassingYear"
                placeholder="Passing Year"
                value={education.degreePassingYear}
                onChange={e => handleChange(e, "education")}
                className="border p-2 rounded mb-2 bg-purple-100 w-full font-semibold"
              />
              <label className="block text-sm font-semibold text-purple-700 mb-1" htmlFor="degreeCGPA">CGPA</label>
              <input
                type="text"
                id="degreeCGPA"
                name="degreeCGPA"
                placeholder="CGPA"
                value={education.degreeCGPA}
                onChange={e => handleChange(e, "education")}
                className="border p-2 rounded bg-purple-100 w-full font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="bg-white shadow rounded-lg px-6 py-4">
          <h3 className="text-lg font-bold text-green-700 mb-2">Professional Details</h3>
          <label className="block text-sm font-semibold text-green-700 mb-1" htmlFor="experience">Work Experience</label>
          <textarea
            id="experience"
            name="experience"
            placeholder="Work Experience"
            value={professional.experience}
            onChange={e => handleChange(e, "professional")}
            className="w-full border p-2 rounded mb-2 bg-green-50 font-semibold"
            rows={3}
          />
          <label className="block text-sm font-semibold text-green-700 mb-1" htmlFor="skills">Skills</label>
          <input
            type="text"
            id="skills"
            name="skills"
            placeholder="Skills (comma separated)"
            value={professional.skills}
            onChange={e => handleChange(e, "professional")}
            className="w-full border p-2 rounded mb-2 bg-green-50 font-semibold"
          />
          <label className="block text-sm font-semibold text-green-700 mb-1" htmlFor="resume">Resume Link</label>
          <input
            type="url"
            id="resume"
            name="resume"
            placeholder="Resume Link (Google Drive, etc.)"
            value={professional.resume}
            onChange={e => handleChange(e, "professional")}
            className="w-full border p-2 rounded bg-green-50 font-semibold"
          />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg hover:scale-105 transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;







