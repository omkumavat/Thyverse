import React, { useState, useEffect } from "react";
import { HelpCircle, X } from "lucide-react";

// Utility functions
const calculateBMI = (weight, height) => {
  if (!weight || !height) return 0;
  return weight / ((height / 100) * (height / 100));
};

const calculateBMR = (weight, height, age, gender) => {
  if (!weight || !height || !age) return 0;
  return gender === "male"
    ? 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)
    : 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
};

const getBMICategory = (bmi) => {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 24.9) return "Normal weight";
  if (bmi < 29.9) return "Overweight";
  return "Obese";
};

const Measurements = () => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("male");
  const [showBMIInfo, setShowBMIInfo] = useState(false);
  const [showBMRInfo, setShowBMRInfo] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("patientData"));
    if (storedData) {
      setWeight(storedData.weight);
      setHeight(storedData.height);
      setAge(storedData.age);
      setGender(storedData.gender);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "patientData",
      JSON.stringify({ weight, height, age, gender })
    );
  }, [weight, height, age, gender]);

  const bmi = calculateBMI(weight, height);
  const bmr = calculateBMR(weight, height, age, gender);
  const bmiCategory = getBMICategory(bmi);

  const InfoModal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in">
        <div className="bg-card m-4 max-w-lg w-full rounded-lg shadow-xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{title}</h3>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="prose dark:prose-invert max-w-none">{children}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold mb-4">Body Measurements</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 rounded-md border bg-background hover:border-primary focus:border-primary transition-all"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full p-2 rounded-md border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full p-2 rounded-md border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full p-2 rounded-md border bg-background"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">BMI Calculator</h2>
              <button onClick={() => setShowBMIInfo(true)} className="p-2 hover:bg-muted rounded-full">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <p className="text-4xl font-bold text-primary">{bmi.toFixed(1)}</p>
            <p className="text-lg text-muted-foreground">{bmiCategory}</p>
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">BMR Calculator</h2>
              <button onClick={() => setShowBMRInfo(true)} className="p-2 hover:bg-muted rounded-full">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <p className="text-4xl font-bold text-primary">{Math.round(bmr)}</p>
            <p className="text-lg text-muted-foreground">calories/day</p>
          </div>
        </div>
      </div>

      <InfoModal show={showBMIInfo} onClose={() => setShowBMIInfo(false)} title="Body Mass Index (BMI)">
        <p>BMI is a measure of body fat based on height and weight.</p>
      </InfoModal>
      <InfoModal show={showBMRInfo} onClose={() => setShowBMRInfo(false)} title="Basal Metabolic Rate (BMR)">
        <p>BMR is the number of calories your body burns at rest.</p>
      </InfoModal>
    </div>
  );
};

export default Measurements;
