import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { Activity, Scale, Ruler, Percent, Heart, Flame } from "lucide-react";
import NavBar from "../NavBar";
export default function BodyMeasureInput() {
  const [weight, setWeight] = useState(localStorage.getItem("weight") || "");
  const [height, setHeight] = useState(localStorage.getItem("height") || "");
  const [bmi, setBmi] = useState(localStorage.getItem("bmi") || "");
  const [bodyFat, setBodyFat] = useState(localStorage.getItem("bodyFat") || "");
  const [gender, setGender] = useState(localStorage.getItem("gender") || "male");
  const [bmr, setBmr] = useState("");
  const [bmiCategory, setBmiCategory] = useState("");
  const [fitnessTip , setFitnessTip] = useState("");
  useEffect(() => {
    if (weight && height) calculateBMI();
  }, [weight, height, bodyFat, gender]);

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
      localStorage.setItem("bmi", bmiValue);
      updateBMICategory(bmiValue);
      calculateBMR(weight, height, bodyFat, gender);
    }
  };

  const updateBMICategory = (bmiValue) => {
    let category = "";
    let tip = "";
    if (bmiValue < 18.5) {
      category = "Underweight";
      tip = "Focus on a balanced diet with enough protein and healthy fats to gain muscle mass.";
    } else if (bmiValue < 24.9) {
      category = "Normal weight";
      tip = "Maintain a healthy diet and regular exercise routine to stay fit.";
    } else if (bmiValue < 29.9) {
      category = "Overweight";
      tip = "Incorporate more physical activity and a balanced diet to shed extra weight gradually.";
    } else {
      category = "Obese";
      tip = "Consult a healthcare professional for personalized diet and exercise recommendations.";
    }
    setBmiCategory(category);
    setFitnessTip(tip);
  };
  const calculateBMR = (w, h, bf, g) => {
    const leanMass = w * (1 - bf / 100);
    const bmrValue =
      g === "male"
        ? (88.36 + 13.4 * w + 4.8 * h - 5.7 * 25).toFixed(2)
        : (447.6 + 9.2 * w + 3.1 * h - 4.3 * 25).toFixed(2);
    setBmr(bmrValue);
  };

  const data = [
    { name: "Weight", value: weight ? parseFloat(weight) : 0 },
    { name: "Height", value: height ? parseFloat(height) : 0 },
    { name: "BMI", value: bmi ? parseFloat(bmi) : 0 },
  ];

  const getBMICategoryColor = () => {
    switch (bmiCategory.toLowerCase()) {
      case "underweight":
        return "text-blue-500";
      case "normal weight":
        return "text-green-500";
      case "overweight":
        return "text-yellow-500";
      case "obese":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };
  

  const InputField = ({ label, icon: Icon, value, onChange, readOnly = false, unit = "", type = "number" }) => (
    <div className="bg-[#000042]/90 backdrop-blur-lg rounded-xl p-4 transition-all duration-300 hover:bg-[#000042]/95">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-orange-400" />
        <label className="text-lg font-medium text-white">{label}</label>
      </div>
      <input
        type={type}
        className={`w-full bg-[#000042]/50 text-white p-3 rounded-lg border border-orange-400/20 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 ${readOnly ? 'cursor-not-allowed' : ''}`}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      {unit && <span className="text-sm text-orange-200 mt-1 block">{unit}</span>}
    </div>
  );

  return (
    <div>
      <div>
        <NavBar/>
      </div>
      <motion.div
        className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-300 p-8 font-poppins"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14">
            <motion.div 
              className="space-y-6"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-[#000042]/80 backdrop-blur-lg rounded-2xl p-6 border border-orange-400/20">
                <div className="grid gap-6">
                  <div className="flex gap-4">
                    <button
                      className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 ${
                        gender === "male" 
                          ? "bg-orange-500 text-white" 
                          : "bg-[#000042] text-white/70 hover:bg-[#000042]/80"
                      }`}
                      onClick={() => {
                        setGender("male");
                        localStorage.setItem("gender", "male");
                      }}
                    >
                      Male
                    </button>
                    <button
                      className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 ${
                        gender === "female" 
                          ? "bg-orange-500 text-white" 
                          : "bg-[#000042] text-white/70 x"
                      }`}
                      onClick={() => {
                        setGender("female");
                        localStorage.setItem("gender", "female");
                      }}
                    >
                      Female
                    </button>
                  </div>

                  <InputField
                    label="Weight"
                    icon={Scale}
                    value={weight}
                    onChange={(e) => {
                      setWeight(e.target.value);
                      localStorage.setItem("weight", e.target.value);
                    }}
                    unit="kg"
                  />

                  <InputField
                    label="Height"
                    icon={Ruler}
                    value={height}
                    onChange={(e) => {
                      setHeight(e.target.value);
                      localStorage.setItem("height", e.target.value);
                    }}
                    unit="cm"
                  />

                  <InputField
                    label="Body Fat"
                    icon={Percent}
                    value={bodyFat}
                    onChange={(e) => {
                      setBodyFat(e.target.value);
                      localStorage.setItem("bodyFat", e.target.value);
                    }}
                    unit="%"
                  />
                </div>
              </div>

              <div className="bg-[#000042]/80 backdrop-blur-lg rounded-2xl p-6 border border-orange-400/20">
                <div className="grid gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-orange-400" />
                        <span className="text-lg font-medium text-white">BMI</span>
                      </div>
                      <span className={`text-xl font-bold ${getBMICategoryColor()}`}>
                        {bmi || "-"}
                      </span>
                    </div>
                    {bmiCategory && (
                      <div className="text-sm text-white/70">
                        Category: <span className={`font-medium ${getBMICategoryColor()}`}>{bmiCategory}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Flame className="w-5 h-5 text-orange-400" />
                      <span className="text-lg font-medium text-white">BMR</span>
                    </div>
                    <span className="text-xl font-bold text-orange-400">
                      {bmr || "-"} kcal/day
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-[#000042]/80 backdrop-blur-lg rounded-2xl p-6 border h-fit border-orange-400/20"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-400" />
                Metrics Visualization
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.5)"
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.5)"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "rgba(0,0,66,0.95)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "8px",
                      color: "white"
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#fb923c"
                    strokeWidth={2}
                    dot={{ fill: "#fb923c", strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="bg-[#000042] text-white mt-4 rounded-md text-xl p-4">
  <h2 className="text-[#FFD700] font-bold mb-2">Fitness Tip</h2>
  {fitnessTip && <p>{fitnessTip}</p>}
</div>

            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}