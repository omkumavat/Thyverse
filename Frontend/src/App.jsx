import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import About2 from "./Pages/About2";
import AuthForm from "./Components/LoginComponents/AuthForm";
import Dashboard from "./Components/DashBoardComponents/Dashboard"
import DashboardMain from "./Components/DashBoardComponents/DashboardMain";
import { useAuth } from "./Context/AuthProvider";
import ProtectedRouteForLogin from "./Context/ProtectedRoute";
import Vitals from "./Components/DashBoardComponents/Vitals";
import Measurements from "./Components/DashBoardComponents/Measurements";
import Medications from "./Components/DashBoardComponents/Medications"
import ThyverseHome from "./Components/ThyverseHome";
import Nutritionmain from "./Components/Nutrition/Nutritionmain";
import FoodLogger from "./Components/Nutrition/FoodLogger";
import MealPlanner from "./Components/Nutrition/MealPlanner";
import Progress from "./Components/Nutrition/Progress";
import UserProfile from "./Components/Nutrition/UserProfile"
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
      <Route path="/thyverse/dashboard" element={<DashboardMain/>} />

      <Route path="/thyverse/dashboard/vitalinput" element={<Vitals/>}></Route>
      <Route path="/thyverse/dashboard/bodyinput" element={<Measurements/>}/>
      <Route path="/thyverse/dashboard/medication" element={<Medications/>}/>
      <Route path="/thyverse" element={<ThyverseHome/>}/>
      <Route path="/thyverse/about" element={<About2/>}/>
      <Route path="/nutrition" element={<Nutritionmain/>}></Route>
      <Route path="/nutrition/progress" element={<Progress/>}></Route>
      <Route path="/nutrition/mealplanner" element={<MealPlanner/>}></Route>
      <Route path="/nutrition/foodlogger" element={<FoodLogger/>}></Route>
      <Route path="/nutrition/profile" element={<UserProfile/>}></Route>
      
    </Routes>
  );
}

export default App;
