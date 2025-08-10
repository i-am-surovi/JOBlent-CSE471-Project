import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RecruiterLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Recruiter login attempt:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  // Simple inline styles to test without Tailwind
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f3f4f6 0%, #ffffff 50%, #faf5ff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  };

  const formContainerStyle = {
    maxWidth: '400px',
    width: '100%',
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    marginBottom: '16px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    marginTop: '16px'
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: '#111827' }}>
            Welcome Back, Recruiter
          </h2>
          <p style={{ color: '#6b7280' }}>
            Sign in to manage your job postings and candidates
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="recruiter@company.com"
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={buttonStyle}
          >
            {isLoading ? 'Signing in...' : 'Sign in to Dashboard'}
          </button>
        </form>

        {/* Sign Up Link */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Don't have a recruiter account?{' '}
            <Link 
              to="/recruiter/signup" 
              style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}
            >
              Sign up here
            </Link>
          </p>
        </div>

        {/* Back to User Login */}
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Link 
            to="/sign-in" 
            style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}
          >
            ← Back to User Login
          </Link>
        </div>

        {/* Debug Info */}
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
            Debug: Component is rendering properly!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterLogin;