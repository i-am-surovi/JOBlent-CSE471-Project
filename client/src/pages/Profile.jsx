// src/pages/Profile.jsx
import React, { useState } from "react";

const Profile = () => {
  const [personal, setPersonal] = useState({
    fullName: "",
    phone: "",
    address: "",
    dob: "",
  });

  const [education, setEducation] = useState({
    schoolName: "",
    schoolPassingYear: "",
    schoolGPA: "",
    collegeName: "",
    collegePassingYear: "",
    collegeGPA: "",
    degreeName: "",
    degreePassingYear: "",
    degreeCGPA: "",
  });

  const [professional, setProfessional] = useState({
    experience: "",
    skills: "",
    resume: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...personal,
      ...education,
      ...professional,
    });
    alert("Profile updated successfully!");
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        
        {/* Personal Details */}
        <div>
          <h3 className="text-lg font-medium mb-2">Personal Details</h3>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={personal.fullName}
            onChange={(e) => handleChange(e, "personal")}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={personal.phone}
            onChange={(e) => handleChange(e, "personal")}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={personal.address}
            onChange={(e) => handleChange(e, "personal")}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="date"
            name="dob"
            value={personal.dob}
            onChange={(e) => handleChange(e, "personal")}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Education Section */}
        <div>
          <h3 className="text-lg font-medium mb-2">Education Background</h3>

          {/* School */}
          <div className="border p-4 rounded mb-4 bg-gray-50">
            <h4 className="font-semibold mb-2">School</h4>
            <input
              type="text"
              name="schoolName"
              placeholder="School Name"
              value={education.schoolName}
              onChange={(e) => handleChange(e, "education")}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="number"
              name="schoolPassingYear"
              placeholder="Passing Year"
              value={education.schoolPassingYear}
              onChange={(e) => handleChange(e, "education")}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              name="schoolGPA"
              placeholder="GPA"
              value={education.schoolGPA}
              onChange={(e) => handleChange(e, "education")}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* College */}
          <div className="border p-4 rounded mb-4 bg-gray-50">
            <h4 className="font-semibold mb-2">College</h4>
            <input
              type="text"
              name="collegeName"
              placeholder="College Name"
              value={education.collegeName}
              onChange={(e) => handleChange(e, "education")}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="number"
              name="collegePassingYear"
              placeholder="Passing Year"
              value={education.collegePassingYear}
              onChange={(e) => handleChange(e, "education")}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              name="collegeGPA"
              placeholder="GPA"
              value={education.collegeGPA}
              onChange={(e) => handleChange(e, "education")}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Undergraduate/Degree */}
          <div className="border p-4 rounded bg-gray-50">
            <h4 className="font-semibold mb-2">Undergraduate / Degree</h4>
            <input
              type="text"
              name="degreeName"
              placeholder="Degree Name (e.g., B.Sc. in Computer Science)"
              value={education.degreeName}
              onChange={(e) => handleChange(e, "education")}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="number"
              name="degreePassingYear"
              placeholder="Passing Year"
              value={education.degreePassingYear}
              onChange={(e) => handleChange(e, "education")}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              name="degreeCGPA"
              placeholder="CGPA"
              value={education.degreeCGPA}
              onChange={(e) => handleChange(e, "education")}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Professional Details */}
        <div>
          <h3 className="text-lg font-medium mb-2">Professional Details</h3>
          <textarea
            name="experience"
            placeholder="Work Experience"
            value={professional.experience}
            onChange={(e) => handleChange(e, "professional")}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={professional.skills}
            onChange={(e) => handleChange(e, "professional")}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="url"
            name="resume"
            placeholder="Resume Link (Google Drive, etc.)"
            value={professional.resume}
            onChange={(e) => handleChange(e, "professional")}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
