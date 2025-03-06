import React, { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import axios from "axios"; // Make sure axios is imported
import { login as authLogin } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";

const SignupForm = ({ onToggleAuth }) => {
  const {login} =useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State hooks for input fields and error message
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Sign up function triggered on form submission
  const signUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "https://thyverse.vercel.app/user/signup-user",
        {
          name: fullName,
          email,
          password,
        }
      );

      // Assuming your API returns a success flag and a user object
      if (res.data.success) {
        const userData = res.data.user;
        
        dispatch(authLogin(userData));

       login(userData);

        // Navigate to a protected route, e.g., a dashboard
        navigate("/");
      } else {
        setError(res.data.message || "Signup failed, please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred, please try again.");
    }
  };

  return (
    <div className="p-12 md:w-3/5 relative h-screen md:h-auto overflow-y-auto">
      <div className="text-center mb-10 font-poppins">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          Create Account
        </h2>
        <p className="text-gray-600 text-lg">
          Join us to start your healthcare journey
        </p>
      </div>

      <form
        className="space-y-8 max-w-2xl mx-auto font-poppins"
        onSubmit={signUp}
      >
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="pl-12 w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-4 px-6 text-lg rounded-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
        >
          Create Account
        </button>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={onToggleAuth}
            className="text-orange-600 hover:text-orange-500 flex items-center justify-center gap-2 mx-auto transition-colors text-base"
          >
            <Lock className="w-5 h-5" />
            <span>Already have an account?</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
