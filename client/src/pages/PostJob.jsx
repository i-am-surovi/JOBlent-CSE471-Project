// src/pages/PostJob.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PostJob = () => {
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
    salary: '',
    jobType: '',
    experienceLevel: '',
    category: '',
    applicationDeadline: '',
  });

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('recruiterToken'); // save this on login
      await axios.post('/api/jobs', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Job posted successfully!');
      setForm({
        title: '', company: '', location: '', description: '', requirements: '',
        salary: '', jobType: '', experienceLevel: '', category: '', applicationDeadline: ''
      });
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to post job');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Post a Job</h2>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input className="border p-2" name="title" placeholder="Title" value={form.title} onChange={onChange}/>
        <input className="border p-2" name="company" placeholder="Company" value={form.company} onChange={onChange}/>
        <input className="border p-2" name="location" placeholder="Location" value={form.location} onChange={onChange}/>
        <textarea className="border p-2" name="description" placeholder="Description" value={form.description} onChange={onChange}/>
        <textarea className="border p-2" name="requirements" placeholder="Requirements" value={form.requirements} onChange={onChange}/>
        <input className="border p-2" name="salary" placeholder="Salary" value={form.salary} onChange={onChange}/>
        <input className="border p-2" name="jobType" placeholder="Job Type (e.g., Full-time)" value={form.jobType} onChange={onChange}/>
        <input className="border p-2" name="experienceLevel" placeholder="Experience Level" value={form.experienceLevel} onChange={onChange}/>
        <input className="border p-2" name="category" placeholder="Category" value={form.category} onChange={onChange}/>
        <input className="border p-2" type="date" name="applicationDeadline" value={form.applicationDeadline} onChange={onChange}/>
        <button className="bg-blue-600 text-white py-2 rounded">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
