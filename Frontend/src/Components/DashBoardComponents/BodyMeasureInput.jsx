import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Toaster, toast } from 'react-hot-toast';
import { motion } from "framer-motion";
import { Activity, Scale, Ruler, Percent, Heart, Flame } from "lucide-react";
import NavBar from "../NavBar";
import { useAuth } from "../../Context/AuthProvider";
import axios from "axios";

export default function BodyMeasureInput() {
  const { currentUser } = useAuth();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [gender, setGender] = useState("male");
  const [bmr, setBmr] = useState("");
  const [bmiCategory, setBmiCategory] = useState("");
  const [fitnessTip, setFitnessTip] = useState("");

  const [BodyMeasure, setBodyMeasure] = useState({
    weight: "",
    height: "",
    bmi: "",
    bodyFat: "",
  })

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBodyMeasure((bodyMeasure) => ({ ...bodyMeasure, [id]: value }));
  };

  // const calculateBMI = () => {
  //   if (BodyMeasure.weight && BodyMeasure.height) {
  //     const w=parseInt(BodyMeasure.weight);
  //     const h=parseInt(BodyMeasure.height)
  //     const heightInMeters = h / 100;
  //     const bmiValue = (w / (heightInMeters * heightInMeters)).toFixed(2);
  //     console.log(bmiValue);
  //     setBodyMeasure((prev) => ({
  //       ...prev,
  //       bmi: (bmiValue),
  //     }));      
  //     updateBMICategory(bmiValue);
  //     calculateBMR(BodyMeasure.weight, BodyMeasure.height, gender);
  //   }
  // };

  const getCalculatedBMI = (weight, height) => {
    const w = parseInt(weight);
    const h = parseInt(height);
    const heightInMeters = h / 100;
    return (w / (heightInMeters * heightInMeters)).toFixed(2);
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

  const calculateBMR = (w, h, g) => {

    // Note: Age is hard-coded as 25 here.
    const bmrValue =
      g === "male"
        ? (88.36 + 13.4 * w + 4.8 * h - 5.7 * 25).toFixed(2)
        : (447.6 + 9.2 * w + 3.1 * h - 4.3 * 25).toFixed(2);
    setBmr(bmrValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (BodyMeasure.weight && BodyMeasure.height) {
      // Calculate BMI synchronously
      const bmiValue = getCalculatedBMI(BodyMeasure.weight, BodyMeasure.height);

      updateBMICategory(bmiValue);
      calculateBMR(BodyMeasure.weight, BodyMeasure.height, gender);

      // Build the payload with the calculated BMI value
      const payload = {
        ...BodyMeasure,
        bmi: bmiValue,
      };

      try {
        if (currentUser) {
          console.log("Payload to send:", payload);
          const response = await axios.post(
            `http://localhost:4000/server/dashuser/add-body-measures/${currentUser._id}`,
            payload
          );
          console.log("Response:", response);

          if (response.data.success) {
            getBodyMeasures();
            toast.success("Body Measurements Saved.. !");
          } else {
            toast.error("Failed to Save Body Measurements.. !");
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to Save Body Measurements.. !");
      }
    } else {
      toast.error("Please enter weight and height");
    }
  };


  const data = [
    { name: "Weight", value: BodyMeasure.weight ? parseFloat(BodyMeasure.weight) : 0 },
    { name: "Height", value: BodyMeasure.height ? parseFloat(BodyMeasure.height) : 0 },
    { name: "BMI", value: BodyMeasure.bmi ? parseFloat(BodyMeasure.bmi) : 0 },
  ];

  async function getBodyMeasures() {
    try {
      if (currentUser) {
        const response = await axios.get(`http://localhost:4000/server/dashuser/get-body-measures/${currentUser._id}`);
        if (response.data.success) {
          const data = response.data;
          setBodyMeasure({
            height: data.height,
            weight: data.weight,
            bodyFat: data.bodyFat,
            bmi: data.bmi
          })
          updateBMICategory(response.data.bmi);
          calculateBMR(data.weight, data.height, gender);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBodyMeasures();
  }, [])

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

  const InputField = ({ id, label, icon: Icon, value, onChange, readOnly = false, unit = "", type = "number" }) => (
    <div className="bg-[#000042]/90 backdrop-blur-lg rounded-xl p-4 transition-all duration-300 hover:bg-[#000042]/95">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-orange-400" />
        <label htmlFor={id} className="text-lg font-medium text-white">{label}</label>
      </div>
      <input
        id={id}
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
      <NavBar />
      <motion.div
        className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-300 p-8 font-poppins"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Toaster position="top-right" reverseOrder={false} />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14">
            <motion.div
              className="space-y-6"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <form onSubmit={handleSubmit}>
                <div className="bg-[#000042]/80 backdrop-blur-lg rounded-2xl p-6 border border-orange-400/20">
                  <div className="grid gap-6">
                    <div className="flex gap-4">
                      <button
                        type="button"
                        className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 ${gender === "male"
                          ? "bg-orange-500 text-white"
                          : "bg-[#000042] text-white/70 hover:bg-[#000042]/80"
                          }`}
                        onClick={() => setGender("male")}
                      >
                        Male
                      </button>
                      <button
                        type="button"
                        className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 ${gender === "female"
                          ? "bg-orange-500 text-white"
                          : "bg-[#000042] text-white/70"
                          }`}
                        onClick={() => setGender("female")}
                      >
                        Female
                      </button>
                    </div>

                    <InputField
                      id="weight"
                      label="Weight"
                      icon={Scale}
                      value={BodyMeasure.weight}
                      onChange={handleInputChange}
                      unit="kg"
                    />


                    <InputField
                      id="height"
                      label="Height"
                      icon={Ruler}
                      value={BodyMeasure.height}
                      onChange={handleInputChange}
                      unit="cm"
                    />

                    <InputField
                      id="bodyFat"
                      label="Body Fat"
                      icon={Percent}
                      value={BodyMeasure.bodyFat}
                      onChange={handleInputChange}
                      unit="%"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-6 w-full py-3 bg-orange-500 text-white rounded-lg transition-all duration-300 hover:bg-orange-600"
                  >
                    Save Metrics
                  </button>
                </div>
              </form>

              <div className="bg-[#000042]/80 backdrop-blur-lg rounded-2xl p-6 border border-orange-400/20">
                <div className="grid gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-orange-400" />
                        <span className="text-lg font-medium text-white">BMI</span>
                      </div>
                      <span className={`text-xl font-bold ${getBMICategoryColor()}`}>
                        {BodyMeasure.bmi || "-"}
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
