import React, { useState } from 'react';
import { Lock, Mail, UserPlus } from 'lucide-react';
import authService from '../../appwrite/Auth';
import { useDispatch } from 'react-redux';
import {login as authLogin} from '../../store/authSlice'
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onToggleAuth }) => {
  // State hooks to store form data and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch =useDispatch();
  const navigate=useNavigate();

  // Function to perform login (assuming authService, dispatch, and navigate are defined elsewhere)
  const login = async () => {
    setError("");
    try {
      const session = await authService.login({ email, password });
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="p-12 md:w-3/5 relative h-screen md:h-auto overflow-y-auto">
      <div className="text-center mb-10 font-poppins">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">Welcome Back</h2>
        <p className="text-gray-600 text-lg">Please sign in to access your account</p>
      </div>

      <form
        className="space-y-8 max-w-2xl mx-auto font-poppins"
        onSubmit={handleSubmit}
      >
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

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 rounded text-orange-500 border-gray-300 focus:ring-orange-500"
            />
            <span className="ml-2 text-base text-gray-600">Remember me</span>
          </label>
          <a
            href="#"
            className="text-base text-orange-600 hover:text-orange-500 transition-colors"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-4 px-6 text-lg rounded-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
        >
          Sign In
        </button>

        <button
          onClick={authService.loginWithGoogle}
          className="w-full bg-blue-500 text-white py-4 px-6 text-lg rounded-lg hover:bg-orange-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
        >
          LogIn With Google
        </button>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={onToggleAuth}
            className="text-orange-600 hover:text-orange-500 flex items-center justify-center gap-2 mx-auto transition-colors text-base"
          >
            <UserPlus className="w-5 h-5" />
            <span>Create new account</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
