import React, { useState } from "react";
import { BackgroundIcons } from "./BackgroundIcons";
import { BrandingPanel } from "./BrandingPanel";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import NavBar from "../NavBar";
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col justify-center">
      <div>
        <NavBar/>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50 relative overflow-hidden">
        <BackgroundIcons />

        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-navy rounded-full filter blur-3xl opacity-10 translate-x-1/2 translate-y-1/2"></div>
        {/* Authentication Box */}
        <div className="bg-white/90 mt-10 backdrop-blur-sm shadow-xl overflow-auto w-full max-w-[75vw] max-h-[90vh] md:rounded-2xl flex flex-col md:flex-row relative z-10">
          <BrandingPanel />
          {isLogin ? (
            <LoginForm onToggleAuth={() => setIsLogin(false)} />
          ) : (
            <SignupForm onToggleAuth={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
