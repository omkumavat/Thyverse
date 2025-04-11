import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Pill,
  Ruler,
  Activity,
  LineChart,
  Settings,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import Medications from "./Medications";
import Measurements from "./Measurements";
import Vitals from "./Vitals";
import SettingsPanel from "./SettingsPanel";
import ThyroidPanel from "./ThyroidPanel";
import NavBar from "../NavBar";

const DashboardMain = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Set the active tab based on the current path whenever location changes
  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes("medication")) {
      setActiveTab("medications");
    } else if (path.includes("measurement")) {
      setActiveTab("measurements");
    } else if (path.includes("vitalinput")) {
      setActiveTab("vitals");
    } else if (path.includes("thyroidpanel")) {
      setActiveTab("thyroid");
    } else if (path.includes("settings")) {
      setActiveTab("settings");
    } else if (path.includes("dashboard")) {
      setActiveTab("dashboard");
    }
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar remains fixed at the top */}
      <div className="fixed top-0 left-0 w-full z-30 bg-background shadow-md">
        <NavBar />
      </div>

      <div className="flex flex-1 pt-16 bg-background">
        {/* Mobile hamburger menu button */}
        <div className="md:hidden fixed top-4 left-4 z-20">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-background rounded-md shadow-md"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar navigation */}
        <div
          className={`fixed md:relative w-64 h-full bg-background shadow-md z-10 transition-all duration-300 ${
            isSidebarOpen ? "left-0" : "-left-64 md:left-0"
          }`}
        >
          <div className="p-4 border-b border-border">
            <h1 className="text-xl font-bold text-primary">
              Health Dashboard
            </h1>
          </div>

          <nav className="p-4">
            <ul>
              <li className="mb-2">
                <NavLink
                  to="/thyverse/dashboard"
                  className={`flex items-center w-full p-3 rounded-md transition-colors ${
                    activeTab === "dashboard"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => {
                    setActiveTab("dashboard");
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                  end 
                >
                  <span className="mr-3">
                    <Home size={20} />
                  </span>
                  Dashboard
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink
                  to="/thyverse/dashboard/medication"
                  className={`flex items-center w-full p-3 rounded-md transition-colors ${
                    activeTab === "medications"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => {
                    setActiveTab("medications");
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                >
                  <span className="mr-3">
                    <Pill size={20} />
                  </span>
                  Medications
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink
                  to="/thyverse/dashboard/measurement"
                  className={`flex items-center w-full p-3 rounded-md transition-colors ${
                    activeTab === "measurements"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => {
                    setActiveTab("measurements");
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                >
                  <span className="mr-3">
                    <Ruler size={20} />
                  </span>
                  Measurements
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink
                  to="/thyverse/dashboard/vitalinput"
                  className={`flex items-center w-full p-3 rounded-md transition-colors ${
                    activeTab === "vitals"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => {
                    setActiveTab("vitals");
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                >
                  <span className="mr-3">
                    <Activity size={20} />
                  </span>
                  Vitals
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink
                  to="/thyverse/dashboard/thyroidpanel"
                  className={`flex items-center w-full p-3 rounded-md transition-colors ${
                    activeTab === "thyroid"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => {
                    setActiveTab("thyroid");
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                >
                  <span className="mr-3">
                    <LineChart size={20} />
                  </span>
                  Thyroid Panel
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink
                  to="/thyverse/dashboard/settings"
                  className={`flex items-center w-full p-3 rounded-md transition-colors ${
                    activeTab === "settings"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => {
                    setActiveTab("settings");
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                >
                  <span className="mr-3">
                    <Settings size={20} />
                  </span>
                  Settings
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-0 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardMain;