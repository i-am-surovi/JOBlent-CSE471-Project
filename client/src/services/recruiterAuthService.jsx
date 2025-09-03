// src/services/recruiterAuthService.jsx

class RecruiterAuthService {
  constructor() {
    this.isOnline = navigator.onLine;
    this.API_BASE = 'http://localhost:5000';
    
    // Initialize with some mock recruiters for offline mode
    this.initializeMockData();
    
    // Listen for online/offline events
    window.addEventListener('online', () => { this.isOnline = true; });
    window.addEventListener('offline', () => { this.isOnline = false; });
  }

  initializeMockData() {
    // Only add default recruiters if no recruiters exist at all
    const existingRecruiters = JSON.parse(localStorage.getItem('mockRecruiters') || '[]');
    
    if (existingRecruiters.length === 0) {
      const defaultRecruiters = [
        {
          id: 1,
          name: "Tech Corp",
          email: "admin@techcorp.com",
          password: "password123",
          image: null,
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('mockRecruiters', JSON.stringify(defaultRecruiters));
    }
  }

  async checkServerHealth() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
      
      const response = await fetch(`${this.API_BASE}/api/health`, {
        method: 'GET',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async login(email, password) {
    // First try server login if online
    const serverAvailable = await this.checkServerHealth();
    
    if (serverAvailable) {
      try {
        const response = await fetch(`${this.API_BASE}/api/company/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success) {
          localStorage.setItem("recruiterToken", data.token);
          localStorage.setItem("recruiterData", JSON.stringify(data.company || { email, name: data.name }));
          return { success: true, data: data.company, mode: 'server' };
        } else {
          return { success: false, message: data.message || "Login failed", mode: 'server' };
        }
      } catch (error) {
        // If server fails, fall back to local auth
        console.log('Server login failed, falling back to local auth');
      }
    }

    // Fallback to local authentication
    return this.localLogin(email, password);
  }

  localLogin(email, password) {
    const mockRecruiters = JSON.parse(localStorage.getItem('mockRecruiters') || '[]');
    console.log('Available recruiters:', mockRecruiters.map(r => ({ email: r.email, name: r.name })));
    
    const recruiter = mockRecruiters.find(r => 
      r.email.toLowerCase() === email.toLowerCase() && r.password === password
    );

    if (recruiter) {
      const token = `mock-token-${Date.now()}`;
      localStorage.setItem("recruiterToken", token);
      localStorage.setItem("recruiterData", JSON.stringify(recruiter));
      localStorage.setItem("authMode", "local");
      
      return { 
        success: true, 
        data: recruiter, 
        mode: 'local',
        message: 'Logged in successfully (offline mode)'
      };
    } else {
      // Show available emails for debugging
      const availableEmails = mockRecruiters.map(r => r.email).join(', ');
      return { 
        success: false, 
        message: availableEmails.length > 0 
          ? `Invalid credentials. Available emails: ${availableEmails}` 
          : "No recruiters registered. Please sign up first.", 
        mode: 'local' 
      };
    }
  }

  async register(formData) {
    const serverAvailable = await this.checkServerHealth();
    
    if (serverAvailable) {
      try {
        const response = await fetch(`${this.API_BASE}/api/company/register`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        return { ...data, mode: 'server' };
      } catch (error) {
        console.log('Server registration failed, falling back to local registration');
      }
    }

    // Fallback to local registration
    return this.localRegister(formData);
  }

  localRegister(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const image = formData.get('image');

    const mockRecruiters = JSON.parse(localStorage.getItem('mockRecruiters') || '[]');
    
    // Check if email already exists (case insensitive)
    if (mockRecruiters.find(r => r.email.toLowerCase() === email.toLowerCase())) {
      return { 
        success: false, 
        message: "Email already registered", 
        mode: 'local' 
      };
    }

    // Add new recruiter
    const newRecruiter = {
      id: Date.now(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      image: image ? URL.createObjectURL(image) : null,
      createdAt: new Date().toISOString()
    };

    mockRecruiters.push(newRecruiter);
    localStorage.setItem('mockRecruiters', JSON.stringify(mockRecruiters));

    console.log('New recruiter registered:', { email: newRecruiter.email, name: newRecruiter.name });

    return { 
      success: true, 
      message: "Registration successful! You can now log in.", 
      mode: 'local' 
    };
  }

  isAuthenticated() {
    return !!localStorage.getItem("recruiterToken");
  }

  getRecruiterData() {
    const data = localStorage.getItem("recruiterData");
    return data ? JSON.parse(data) : null;
  }

  getAuthMode() {
    return localStorage.getItem("authMode") || 'server';
  }

  logout() {
    localStorage.removeItem("recruiterToken");
    localStorage.removeItem("recruiterData");
    localStorage.removeItem("authMode");
  }

  // Add method to get all registered recruiters for debugging
  getAllRecruiters() {
    return JSON.parse(localStorage.getItem('mockRecruiters') || '[]');
  }

  // Add method to clear all data (for testing)
  clearAllData() {
    localStorage.removeItem('mockRecruiters');
    localStorage.removeItem('recruiterToken');
    localStorage.removeItem('recruiterData');
    localStorage.removeItem('authMode');
    this.initializeMockData();
  }
}

export const recruiterAuthService = new RecruiterAuthService();