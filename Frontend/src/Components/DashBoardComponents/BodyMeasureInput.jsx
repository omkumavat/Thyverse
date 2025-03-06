import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";
import { Toaster, toast } from 'react-hot-toast';
import { motion } from "framer-motion";
import { Activity, Scale, Ruler, Percent, Heart, Flame } from "lucide-react";
import NavBar2 from "../NavBar2";
import { useAuth } from "../../Context/AuthProvider";
import axios from "axios";
import DashNavbar from "./DashNavbar";
export default function BodyMeasureInput() {
  const { currentUser } = useAuth();
  const [bmi, setBmi] = useState(0);
  const [gender, setGender] = useState("male");
  const [bmr, setBmr] = useState(0);
  const [bmiCategory, setBmiCategory] = useState("");
  const [fitnessTip, setFitnessTip] = useState("");
  const [sevenDayBodyMeasures, setSevenDayBodyMeasures] = useState(null);

  const [bodyMeasure, setBodyMeasure] = useState({
    age: "",
    weight: "",
    height: "",
    bodyFat: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBodyMeasure((prevBodyMeasure) => ({ ...prevBodyMeasure, [id]: value }));
  };

  const getCalculatedBMI = (weight, height) => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h) || h === 0) return 0;
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
      tip = "Incorporate more physical activity and change diet to shed extra weight gradually.";
    } else {
      category = "Obese";
      tip = "Consult a healthcare professional for personalized diet and exercise recommendations.";
    }
    
    setBmiCategory(category);
    setFitnessTip(tip);
  };

  const calculateBMR = (weight, height, g, age) => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);
    
    if (isNaN(w) || isNaN(h) || isNaN(a)) return 0;
    
    const bmrValue =
      g === "male"
        ? (10 * w + 6.25 * h - 5 * a + 5).toFixed(2)
        : (10 * w + 6.25 * h - 5 * a - 161).toFixed(2);
    
    return bmrValue;
  };

  // Effect to update BMI and BMR when inputs change
  useEffect(() => {
    if (bodyMeasure.weight && bodyMeasure.height) {
      const calculatedBmi = getCalculatedBMI(bodyMeasure.weight, bodyMeasure.height);
      setBmi(calculatedBmi);
      updateBMICategory(parseFloat(calculatedBmi));
      
      if (bodyMeasure.age) {
        const calculatedBmr = calculateBMR(
          bodyMeasure.weight, 
          bodyMeasure.height, 
          gender, 
          bodyMeasure.age
        );
        setBmr(calculatedBmr);
      }
    }
  }, [bodyMeasure, gender]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (bodyMeasure.weight && bodyMeasure.height) {
      // Calculate BMI synchronously
      const bmiValue = getCalculatedBMI(bodyMeasure.weight, bodyMeasure.height);
      const bmrValue = calculateBMR(
        bodyMeasure.weight, 
        bodyMeasure.height, 
        gender, 
        bodyMeasure.age
      );

      // Build the payload with the calculated values
      const payload = {
        ...bodyMeasure,
        bmi: bmiValue,
        bmr: bmrValue
      };

      try {
        if (currentUser) {
          console.log("Payload to send:", payload);
          const response = await axios.post(
            `https://thyverse.vercel.app/dashuser/add-body-measures/${currentUser._id}`,
            payload
          );
          console.log("Response:", response);

          if (response.data.success) {
            getBodyMeasures();
            toast.success("Body Measurements Saved!");
          } else {
            toast.error("Failed to Save Body Measurements!");
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to Save Body Measurements!");
      }
    } else {
      toast.error("Please enter weight and height");
    }
  };

  async function getBodyMeasures() {
    try {
      if (currentUser) {
        const response = await axios.get(
          `https://thyverse.vercel.app/dashuser/get-body-measures/${currentUser._id}`
        );
        
        if (response.data.success) {
          const data = response.data;
          console.log("Retrieved data:", data);
          
          // Only set these values if there's data
          if (data.bmi && data.bmi.length > 0 && data.bmr && data.bmr.length > 0) {
            setBodyMeasure({
              age: data.age || "",
              height: data.height || "",
              weight: data.weight && data.weight.length > 0 ? data.weight[data.weight.length - 1].value : "",
              bodyFat: data.bodyfat && data.bodyfat.length > 0 ? data.bodyfat[data.bodyfat.length - 1].value : ""
            });
            
            setBmr(data.bmr[data.bmr.length - 1].value);
            setBmi(data.bmi[data.bmi.length - 1].value);
            updateBMICategory(parseFloat(data.bmi[data.bmi.length - 1].value));
          }
          
          setSevenDayBodyMeasures(data);
        }
      }
    } catch (error) {
      console.log("Error fetching body measures:", error);
      toast.error("Failed to fetch body measurements");
    }
  }

  useEffect(() => {
    getBodyMeasures();
  }, [currentUser]);

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

  const InputField = ({ id, label, icon: Icon, value, onChange, readOnly = false, unit = "", type = "text" }) => (
    <div className="bg-[#000042]/90 backdrop-blur-lg rounded-xl p-4 transition-all duration-300 hover:bg-[#000042]/95">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-orange-400" />
        <label htmlFor={id} className="text-lg font-medium text-white">{label}</label>
      </div>
      <input
        id={id}
        type={type}
        inputMode="numeric"
        pattern="[0-9]*"
        className={`w-full bg-[#000042]/50 text-white p-3 rounded-lg border border-orange-400/20 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 ${readOnly ? 'cursor-not-allowed' : ''}`}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      {unit && <span className="text-sm text-orange-200 mt-1 block">{unit}</span>}
    </div>
  );

  // Process the data for the chart
  const prepareChartData = () => {
    if (!sevenDayBodyMeasures) return [];
    
    // Ensure all required arrays exist
    const bmiData = sevenDayBodyMeasures.bmi || [];
    const bmrData = sevenDayBodyMeasures.bmr || [];
    const weightData = sevenDayBodyMeasures.weight || [];
    const bodyFatData = sevenDayBodyMeasures.bodyfat || [];
    
    // Get the maximum length
    const maxLength = Math.max(
      bmiData.length,
      bmrData.length,
      weightData.length,
      bodyFatData.length
    );
    
    const chartData = [];
    
    for (let i = 0; i < maxLength; i++) {
      chartData.push({
        time: i < bmiData.length ? bmiData[i].date : null,
        BMI: i < bmiData.length ? parseFloat(bmiData[i].value) : null,
        BMR: i < bmrData.length ? parseFloat(bmrData[i].value) : null,
        Weight: i < weightData.length ? parseFloat(weightData[i].value) : null,
        BodyFat: i < bodyFatData.length ? parseFloat(bodyFatData[i].value) : null,
      });
    }
    
    return chartData;
  };

  const chartData = prepareChartData();

  return (
    <div>
      <DashNavbar />
      <motion.div
        className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-300 p-8 font-poppins"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Toaster position="top-right" reverseOrder={false} />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
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
                        className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 ${
                          gender === "male"
                            ? "bg-orange-500 text-white"
                            : "bg-[#000042] text-white/70 hover:bg-[#000042]/80"
                        }`}
                        onClick={() => setGender("male")}
                      >
                        Male
                      </button>
                      <button
                        type="button"
                        className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 ${
                          gender === "female"
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
                      value={bodyMeasure.weight}
                      onChange={handleInputChange}
                      unit="kg"
                    />

                    <InputField
                      id="height"
                      label="Height"
                      icon={Ruler}
                      value={bodyMeasure.height}
                      onChange={handleInputChange}
                      unit="cm"
                    />

                    <InputField
                      id="bodyFat"
                      label="Body Fat"
                      icon={Percent}
                      value={bodyMeasure.bodyFat}
                      onChange={handleInputChange}
                      unit="%"
                    />

                    <InputField
                      id="age"
                      label="Age"
                      icon={Ruler}
                      value={bodyMeasure.age}
                      onChange={handleInputChange}
                      unit="years"
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
            <div className="bg-gray-900 bg-opacity-90 rounded-xl shadow-2xl p-6 border border-indigo-900 hover:shadow-orange-500/20 transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-5 text-gray-50">Body Measures Trends</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#4B5563" />
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 12, fill: '#D1D5DB' }}
                      tickMargin={10}
                      stroke="#6B7280"
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: '#D1D5DB' }}
                      tickMargin={10}
                      stroke="#6B7280"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(31, 41, 55, 0.95)',
                        border: '1px solid #6B7280',
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: '#F3F4F6',
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      wrapperStyle={{ fontSize: '12px', color: '#E5E7EB' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Weight"
                      name="Weight"
                      stroke="#F97316"
                      strokeWidth={2.5}
                      dot={{ r: 5, fill: '#F97316' }}
                      activeDot={{ r: 7, fill: '#FDBA74' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="BMR"
                      name="BMR"
                      stroke="#FB923C"
                      strokeWidth={2.5}
                      dot={{ r: 5, fill: '#FB923C' }}
                      activeDot={{ r: 7, fill: '#FED7AA' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="BMI"
                      name="BMI"
                      stroke="#22C55E"
                      strokeWidth={2.5}
                      dot={{ r: 5, fill: '#22C55E' }}
                      activeDot={{ r: 7, fill: '#86EFAC' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="BodyFat"
                      name="Body Fat"
                      stroke="#3B82F6"
                      strokeWidth={2.5}
                      dot={{ r: 5, fill: '#3B82F6' }}
                      activeDot={{ r: 7, fill: '#93C5FD' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="bg-[#000042] text-white mt-4 rounded-md text-xl p-4">
                  <h2 className="text-[#FFD700] font-bold mb-2">Fitness Tip</h2>
                  {fitnessTip && <p>{fitnessTip}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}