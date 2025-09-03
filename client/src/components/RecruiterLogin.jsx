import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { recruiterAuthService } from "../services/recruiterAuthService";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);

  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [authMode, setAuthMode] = useState("server");

  const { setShowRecruiterLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (state === "Sign Up" && isTextDataSubmited) {
      if (!name || !email || !password || !image) {
        setErrorMsg("All fields are required!");
        return;
      }
      
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);

        const result = await recruiterAuthService.register(formData);
        
        if (result.success) {
          setSuccessMsg(result.message || "Registration successful! Please log in.");
          setAuthMode(result.mode);
          
          // Auto switch to login after successful registration
          setTimeout(() => {
            setState("Login");
            setIsTextDataSubmited(false);
            setName("");
            setPassword("");
            setEmail("");
            setImage(false);
            setSuccessMsg("");
          }, 2000);
        } else {
          setErrorMsg(result.message || "Registration failed");
          setAuthMode(result.mode);
        }
      } catch (error) {
        setErrorMsg("Registration error: " + error.message);
      }

      setLoading(false);
    } else if (state === "Login") {
      if (!email || !password) {
        setErrorMsg("Email and password are required!");
        return;
      }

      setLoading(true);

      try {
        const result = await recruiterAuthService.login(email, password);
        
        if (result.success) {
          setAuthMode(result.mode);
          setShowRecruiterLogin(false);
          
          if (result.mode === 'local') {
            setSuccessMsg("Logged in successfully (offline mode)");
          }
          
          navigate("/dashboard");
        } else {
          setErrorMsg(result.message || "Login failed");
          setAuthMode(result.mode);
        }
      } catch (error) {
        setErrorMsg("Login error: " + error.message);
      }

      setLoading(false);
    } else if (state === "Sign Up" && !isTextDataSubmited) {
      setIsTextDataSubmited(true);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form onSubmit={onSubmitHandler} className="relative bg-white p-10 rounded-xl text-slate-500 w-[350px]">
        <h1 className="text-center text-2xl text-neutral-700 font-medium">Recruiter {state}</h1>
        <p className="text-sm mb-4">Welcome back! Please sign in to continue</p>

        {/* Connection Status Indicator */}
        <div className="text-xs text-center mb-3">
          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${navigator.onLine ? 'bg-green-500' : 'bg-orange-500'}`}></span>
          {navigator.onLine ? 'Online Mode' : 'Offline Mode'}
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-center mb-4 text-sm">
            {errorMsg}
            {authMode === 'local' && state === "Login" && errorMsg.includes("Invalid credentials") && (
              <div className="mt-2 text-xs bg-blue-50 text-blue-600 p-2 rounded border border-blue-200">
                <strong>💡 Tip:</strong> Try registering a new account first, or use:<br/>
                <strong>Email:</strong> admin@techcorp.com<br/>
                <strong>Password:</strong> password123
              </div>
            )}
            {authMode === 'local' && errorMsg.includes("Available emails") && (
              <div className="mt-2 text-xs bg-blue-50 text-blue-600 p-2 rounded border border-blue-200">
                <strong>📧 Registered Emails Found</strong>
              </div>
            )}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-600 p-3 rounded-lg text-center mb-4 text-sm">
            {successMsg}
          </div>
        )}

        {state === "Sign Up" && isTextDataSubmited ? (
          <div className="flex flex-col items-center gap-4 my-10">
            <label htmlFor="image" className="cursor-pointer">
              <img
                className="w-16 h-16 rounded-full object-cover border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Logo"
              />
              <input 
                onChange={(e) => setImage(e.target.files[0])} 
                type="file" 
                id="image" 
                accept="image/*" 
                hidden 
              />
            </label>
            <p className="text-center text-sm">
              Upload Company Logo
              <br />
              <span className="text-xs text-gray-400">(Optional for offline mode)</span>
            </p>
          </div>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5 focus-within:border-blue-400 transition-colors">
                <img src={assets.person_icon} alt="" className="w-4 h-4" />
                <input
                  className="outline-none text-sm flex-1"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                />
              </div>
            )}
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5 focus-within:border-blue-400 transition-colors">
              <img src={assets.email_icon} alt="" className="w-4 h-4" />
              <input
                className="outline-none text-sm flex-1"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email Id"
                required
              />
            </div>
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5 focus-within:border-blue-400 transition-colors">
              <img src={assets.lock_icon} alt="" className="w-4 h-4" />
              <input
                className="outline-none text-sm flex-1"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </>
        )}

        {state === "Login" && (
          <div className="my-4">
            <p className="text-sm text-blue-600 cursor-pointer hover:underline">Forgot password?</p>
            {!navigator.onLine && (
              <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                <strong>Offline Mode:</strong> Using local authentication
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 w-full text-white py-2 rounded-full mt-4 disabled:opacity-70 hover:bg-blue-700 transition-colors disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Please wait...
            </span>
          ) : (
            state === "Login" ? "Login" : isTextDataSubmited ? "Create Account" : "Next"
          )}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => {
                setState("Sign Up");
                setIsTextDataSubmited(false);
                setErrorMsg("");
                setSuccessMsg("");
              }}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => {
                setState("Login");
                setIsTextDataSubmited(false);
                setErrorMsg("");
                setSuccessMsg("");
              }}
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-5 right-5 cursor-pointer hover:opacity-70 transition-opacity w-6 h-6"
          src={assets.cross_icon}
          alt="Close"
        />
      </form>
    </div>
  );
};

export default RecruiterLogin;