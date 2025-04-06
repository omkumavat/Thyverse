import React, { useState, useEffect } from "react";
import { HelpCircle, X } from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../../Context/AuthProvider";

// Utility functions
const calculateBMI = (weight, height) => {
  if (!weight || !height) return 0;
  return weight / ((height / 100) * (height / 100));
};

const calculateBMR = (weight, height, age, gender) => {
  if (!weight || !height || !age) return 0;
  return gender === "male"
    ? 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age
    : 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
};

const getBMICategory = (bmi) => {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 24.9) return "Normal weight";
  if (bmi < 29.9) return "Overweight";
  return "Obese";
};

const Measurements = () => {
  // Initialize fields as empty strings so inputs are truly empty by default.
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [loading, setLoading] = useState(false);
  const [showBMIInfo, setShowBMIInfo] = useState(false);
  const [showBMRInfo, setShowBMRInfo] = useState(false);
  const { currentUser } = useAuth();

  // Convert string inputs to numbers for calculations.
  const numericWeight = Number(weight);
  const numericHeight = Number(height);
  const numericAge = Number(age);

  // Computed values from state; if required fields are missing, show 0.
  const bmi =
    numericWeight > 0 && numericHeight > 0
      ? calculateBMI(numericWeight, numericHeight)
      : 0;
  const bmr =
    numericWeight > 0 && numericHeight > 0 && numericAge > 0
      ? calculateBMR(numericWeight, numericHeight, numericAge, gender)
      : 0;
  const bmiCategory = getBMICategory(bmi);

  // Modal Component for information
  const InfoModal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in">
        <div className="bg-card m-4 max-w-lg w-full rounded-lg shadow-xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="prose dark:prose-invert max-w-none">{children}</div>
          </div>
        </div>
      </div>
    );
  };

  // Function to submit measurement data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      weight: numericWeight,
      height: numericHeight,
      age: numericAge,
      gender,
      bmi: parseFloat(bmi.toFixed(1)),
      bmr: Math.round(bmr),
      bmiCategory,
    };

    try {
      // Update the URL with your backend endpoint
      const response = await axios.post(
        `https://thyverse-backend.vercel.app/server/dashuser/add-body-measures/${currentUser._id}`,
        payload
      );
      if (response.data.success) {
        toast.success("Measurements submitted successfully!");
        // Optionally, re-fetch the latest data after submitting.
        getBodyMeasures();
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Submission failed. Please try again.");
    }
    setLoading(false);
  };

  // Function to fetch measurements from the backend and reflect them in the UI
  async function getBodyMeasures() {
    try {
      if (currentUser) {
        const response = await axios.get(
          `https://thyverse-backend.vercel.app/server/dashuser/get-body-measures/${currentUser._id}`
        );

        if (response.data.success) {
          // Assuming the returned data is stored in response.data.data or response.data directly.
          const data = response.data;
          console.log("Retrieved data:", data);

          // Update form fields if data exists
          if (data) {
            if (data.height) setHeight(String(data.height));
            if (data.age) setAge(String(data.age));
            if (data.gender) setGender(data.gender);
            // Assume weight is stored as an array of records; we use the latest weight value.
            if (data.weight && data.weight.length > 0) {
              setWeight(String(data.weight[data.weight.length - 1].value));
            }
          }
        }
      }
    } catch (error) {
      console.log("Error fetching body measures:", error);
      toast.error("Failed to fetch body measurements");
    }
  }

  useEffect(() => {
    getBodyMeasures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="space-y-8 animate-in">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Measurements Form */}
          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-4">Body Measurements</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-2 rounded-md border bg-background hover:border-primary focus:border-primary transition-all"
                  disabled={loading}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-2 rounded-md border bg-background"
                  disabled={loading}
                  placeholder="Enter weight in kg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-2 rounded-md border bg-background"
                  disabled={loading}
                  placeholder="Enter height in cm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-2 rounded-md border bg-background"
                  disabled={loading}
                  placeholder="Enter your age"
                />
              </div>
            </div>
          </div>

          {/* Calculators */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">BMI Calculator</h2>
                <button
                  onClick={() => setShowBMIInfo(true)}
                  className="p-2 hover:bg-muted rounded-full"
                  disabled={loading}
                >
                  <HelpCircle className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <p className="text-4xl font-bold text-primary">
                {bmi > 0 ? bmi.toFixed(1) : "--"}
              </p>
              <p className="text-lg text-muted-foreground">
                {bmi > 0 ? bmiCategory : ""}
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">BMR Calculator</h2>
                <button
                  onClick={() => setShowBMRInfo(true)}
                  className="p-2 hover:bg-muted rounded-full"
                  disabled={loading}
                >
                  <HelpCircle className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <p className="text-4xl font-bold text-primary">
                {bmr > 0 ? Math.round(bmr) : "--"}
              </p>
              <p className="text-lg text-muted-foreground">calories/day</p>
            </div>
          </div>
        </div>

        {/* Submit Measurements Button */}
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Submit Measurements</h2>
          <p className="mb-4">
            Once you're satisfied with your measurements, click the button below
            to submit your data.
          </p>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Measurements"}
          </button>
        </div>

        <InfoModal
          show={showBMIInfo}
          onClose={() => setShowBMIInfo(false)}
          title="Body Mass Index (BMI)"
        >
          <p>BMI is a measure of body fat based on height and weight.</p>
        </InfoModal>
        <InfoModal
          show={showBMRInfo}
          onClose={() => setShowBMRInfo(false)}
          title="Basal Metabolic Rate (BMR)"
        >
          <p>BMR is the number of calories your body burns at rest.</p>
        </InfoModal>
      </div>
    </>
  );
};

export default Measurements;
