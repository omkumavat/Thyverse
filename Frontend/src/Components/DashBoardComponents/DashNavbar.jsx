import React from "react";
import { useNavigate } from "react-router-dom";

const DashNavbar = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-[#1B2B65] text-white p-6 flex justify-between items-center">
      {/* Left Side - Back Button */}

      {/* Middle Content */}
      <div className="max-w-7xl text-center flex justify-center items-center gap-x-3">
        <button
          onClick={() => navigate("/thyverse/dashboard")}
          className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md font-bold transition-all"
        >
          ←
        </button>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <p className="text-orange-300">John Doe - ID: 12345</p>
        </div>
      </div>

      {/* Right Side - Navigation Links */}
      <div className="flex items-center gap-x-4 text-xl font-bold font-poppins">
        <p
          onClick={() => navigate("/thyverse/dashboard/bodyinput")}
          className="cursor-pointer"
        >
          My Body Measurements
        </p>
        <p
          onClick={() => navigate("/thyverse/dashboard/vitalinput")}
          className="cursor-pointer"
        >
          My Vitals
        </p>
        <p
          onClick={() => navigate("/thyverse/dashboard/medication")}
          className="cursor-pointer"
        >
          My Medications
        </p>
      </div>
    </header>
  );
};

export default DashNavbar;
