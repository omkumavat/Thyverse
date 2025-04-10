import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import About2 from "./Pages/About2";
import AuthForm from "./Components/LoginComponents/AuthForm";
import Dashboard from "./Components/DashBoardComponents/Dashboard";
import DashboardMain from "./Components/DashBoardComponents/DashboardMain";
import { useAuth } from "./Context/AuthProvider";
import ProtectedRouteForLogin from "./Context/ProtectedRoute";
import Vitals from "./Components/DashBoardComponents/Vitals";
import Measurements from "./Components/DashBoardComponents/Measurements";
import Medications from "./Components/DashBoardComponents/Medications";
import ThyverseHome from "./Components/ThyverseHome";
import ThyroidPanel from "./Components/DashBoardComponents/ThyroidPanel";
import SettingsPanel from "./Components/DashBoardComponents/SettingsPanel";
import FoodLogger from "./Components/Nutrition/FoodLogger";
import MealPlanner from "./Components/Nutrition/MealPlanner";
import Progress from "./Components/Nutrition/Progress";
import UserProfile from "./Components/Nutrition/UserProfile";
import NutriNavigation from "./Components/Nutrition/NutriNvaigation";
import NutritionDashboard from "./Components/Nutrition/NutritionDashboard";
function App() {
  const { currentUser } = useAuth();
  // console.log(currentUser);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/login"
        element={
          <ProtectedRouteForLogin>
            <AuthForm />
          </ProtectedRouteForLogin>
        }
      />

      {/* Dashboard layout with sidebar on left and content on right */}
      <Route
        path="/thyverse/dashboard"
        element={
          <div className="flex w-full h-screen">
            <div className="w-64 shrink-0">
              <DashboardMain />
            </div>
            <div className="flex-1 p-6 overflow-auto">
              <Dashboard />
            </div>
          </div>
        }
      />

      <Route
        path="/thyverse/dashboard/vitalinput"
        element={
          <div className="flex w-full h-screen">
            <div className="w-64 shrink-0">
              <DashboardMain />
            </div>
            <div className="flex-1 p-6 overflow-auto">
              <Vitals />
            </div>
          </div>
        }
      />

      <Route
        path="/thyverse/dashboard/measurement"
        element={
          <div className="flex w-full h-screen">
            <div className="w-64 shrink-0">
              <DashboardMain />
            </div>
            <div className="flex-1 p-6 overflow-auto">
              <Measurements />
            </div>
          </div>
        }
      />

      <Route
        path="/thyverse/dashboard/medication"
        element={
          <div className="flex w-full h-screen">
            <div className="w-64 shrink-0">
              <DashboardMain />
            </div>
            <div className="flex-1 p-6 overflow-auto">
              <Medications />
            </div>
          </div>
        }
      />

      <Route
        path="/thyverse/dashboard/thyroidpanel"
        element={
          <div className="flex w-full h-screen">
            <div className="w-64 shrink-0">
              <DashboardMain />
            </div>
            <div className="flex-1 p-6 overflow-auto">
              <ThyroidPanel />
            </div>
          </div>
        }
      />

      <Route
        path="/thyverse/dashboard/settings"
        element={
          <div className="flex w-full h-screen">
            <div className="w-64 shrink-0">
              <DashboardMain />
            </div>
            <div className="flex-1 p-6 overflow-auto">
              <SettingsPanel />
            </div>
          </div>
        }
      />

      <Route path="/thyverse" element={<ThyverseHome />} />
      <Route path="/thyverse/about" element={<About2 />} />

      {/* Updated nutrition routes with consistent styling */}
      <Route
        path="/thyverse/nutrition"
        element={
          <div className="flex w-full h-screen">
            <div className="w-64 shrink-0">
              <NutriNavigation />
            </div>
            <div className="flex-1 p-6 overflow-auto">
              <NutritionDashboard />
            </div>
          </div>
        }
      />

      <Route
        path="/thyverse/nutrition/progress"
        element={
          <div className="flex w-full h-screen">
            <div className="w-64 shrink-0">
              <NutriNavigation />
            </div>
            <div className="flex-1 p-6 overflow-auto">
              <Progress />
            </div>
          </div>
        }
      />

      <Route
        path="/thyverse/nutrition/mealplanner"
        element={
          <div className="flex w-full h-screen">
            <div className="w-64 shrink-0">
              <NutriNavigation />
            </div>
            <div className="flex-1 p-6 overflow-auto">
              <MealPlanner />
            </div>
          </div>
        }
      />

      <Route
        path="/thyverse/nutrition/foodlogger"
        element={
          <div className="flex w-full h-screen">
            <div className="w-64 shrink-0">
              <NutriNavigation />
            </div>
            <div className="flex-1 p-6 overflow-auto">
              <FoodLogger />
            </div>
          </div>
        }
      />

      <Route
        path="/thyverse/nutrition/profile"
        element={
          <div className="flex w-full h-screen">
            <div className="w-64 shrink-0">
              <NutriNavigation />
            </div>
            <div className="flex-1 p-6 overflow-auto">
              <UserProfile />
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
