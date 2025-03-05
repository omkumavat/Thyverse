import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import About2 from "./Pages/About2";
import AuthForm from "./Components/LoginComponents/AuthForm";
import Dashboard from "./Components/DashBoardComponents/Dashboard";
import { useAuth } from "./Context/AuthProvider";
import ProtectedRouteForLogin from "./Context/ProtectedRoute";
import VitalInput from "./Components/DashBoardComponents/VitalInput";
import BodyMeasureInput from "./Components/DashBoardComponents/BodyMeasureInput";
import MedicationForm from "./Components/DashBoardComponents/MedicationForm";
import ThyverseHome from "./Components/ThyverseHome";
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
      <Route path="/thyverse/dashboard" element={<Dashboard />} />
      <Route path="/thyverse/dashboard/vitalinput" element={<VitalInput/>}></Route>
      <Route path="/thyverse/dashboard/bodyinput" element={<BodyMeasureInput/>}/>
      <Route path="/thyverse/dashboard/medication" element={<MedicationForm/>}/>
      <Route path="/thyverse" element={<ThyverseHome/>}/>
      <Route path="/thyverse/about" element={<About2/>}/>
    </Routes>
  );
}

export default App;
