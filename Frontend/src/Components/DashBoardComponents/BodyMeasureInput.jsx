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
import NavBar from "../NavBar";
import { useAuth } from "../../Context/AuthProvider";
import axios from "axios";

export default function BodyMeasureInput() {
  const { currentUser } = useAuth();
  const [bmi, setBmi] = useState(0);
  const [gender, setGender] = useState("male");
  const [bmr, setBmr] = useState(0);
  const [bmiCategory, setBmiCategory] = useState("");
  const [fitnessTip, setFitnessTip] = useState("");
  const [sevenDayBodyMeasures,setSevenDayBodyMeasures]=useState(null);

  const [BodyMeasure, setBodyMeasure] = useState({
    age: "",
    weight: "",
    height: "",
    bodyFat: "",
  })

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBodyMeasure((bodyMeasure) => ({ ...bodyMeasure, [id]: value }));
  };

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
      tip = "Incorporate more physical activity and change diet to shed extra weight gradually.";
    } else {
      category = "Obese";
      tip = "Consult a healthcare professional for personalized diet and exercise recommendations.";
    }
    setBmiCategory(category);
    setFitnessTip(tip);
  };

  const calculateBMR = (w, h, g,age) => {

    h=parseFloat(w);
    w=parseFloat(w);
    age=parseInt(age);
    const bmrValue =
      g === "male"
        ? (10 * w + 6.25 * h - 5 * age + 5).toFixed(2)
        : (10 * w + 6.25 * h - 5 * age - 161).toFixed(2);
    return bmrValue;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (BodyMeasure.weight && BodyMeasure.height) {
      // Calculate BMI synchronously
      const bmiValue = getCalculatedBMI(BodyMeasure.weight, BodyMeasure.height);

      updateBMICategory(bmiValue);
      const bmrValue = calculateBMR(BodyMeasure.weight,BodyMeasure.height, gender,BodyMeasure.age);

      // Build the payload with the calculated BMI value
      const payload = {
        ...BodyMeasure,
        bmi: bmiValue,
        bmr:bmrValue
      };

      console.log(payload)

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

  async function getBodyMeasures() {
    try {
      if (currentUser) {
        const response = await axios.get(`http://localhost:4000/server/dashuser/get-body-measures/${currentUser._id}`);
        if (response.data.success) {
          const data = response.data;
          console.log(data);
          
          setBodyMeasure({
            age: data.age,
            height: data.height,
          })
          setBmr(data.bmr[data.bmr.length-1].value);
          setBmi(data.bmi[data.bmi.length-1].value);
          setSevenDayBodyMeasures(data)
          updateBMICategory(parseInt(bmi));
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

  const data = [
    { time: sevenDayBodyMeasures?.bmi[0]?.date,
       BMI: sevenDayBodyMeasures?.bmi[0]?.value, 
      BMR: sevenDayBodyMeasures?.bmr[0]?.value,
      Weight: sevenDayBodyMeasures?.weight[0]?.value,
      BodyFat: sevenDayBodyMeasures?.bodyfat[0]?.value,
    },
    { time:sevenDayBodyMeasures?.bmi[1]?.date,
       BMI: sevenDayBodyMeasures?.bmi[1]?.value,
       BMR: sevenDayBodyMeasures?.bmr[1]?.value, 
       Weight: sevenDayBodyMeasures?.weight[1]?.value,
       BodyFat: sevenDayBodyMeasures?.bodyfat[1]?.value,},

    { time: sevenDayBodyMeasures?.bmi[2]?.date,
       BMI: sevenDayBodyMeasures?.bmi[2]?.value,
      BMR: sevenDayBodyMeasures?.bmr[2]?.value,
      Weight: sevenDayBodyMeasures?.weight[2]?.value,
      BodyFat: sevenDayBodyMeasures?.bodyfat[2]?.value,},

    { time: sevenDayBodyMeasures?.bmi[3]?.date
      , BMI: sevenDayBodyMeasures?.bmi[3]?.value, 
      BMR: sevenDayBodyMeasures?.bmr[3]?.value,
      Weight: sevenDayBodyMeasures?.weight[3]?.value,
      BodyFat: sevenDayBodyMeasures?.bodyfat[3]?.value,},

    { time:sevenDayBodyMeasures?.bmi[4]?.date
      , BMI: sevenDayBodyMeasures?.bmi[4]?.value, 
      BMR: sevenDayBodyMeasures?.bmr[4]?.value,
      Weight: sevenDayBodyMeasures?.weight[4]?.value,
      BodyFat: sevenDayBodyMeasures?.bodyfat[4]?.value,},

      { time: sevenDayBodyMeasures?.bmi[5]?.date
        , BMI: sevenDayBodyMeasures?.bmi[5]?.value, 
        BMR: sevenDayBodyMeasures?.bmr[5]?.value,
        Weight: sevenDayBodyMeasures?.weight[5]?.value,
        BodyFat: sevenDayBodyMeasures?.bodyfat[5]?.value,},

        { time: sevenDayBodyMeasures?.bmi[6]?.date
          , BMI: sevenDayBodyMeasures?.bmi[6]?.value, 
          BMR: sevenDayBodyMeasures?.bmr[6]?.value,
          Weight: sevenDayBodyMeasures?.weight[6]?.value,
          BodyFat: sevenDayBodyMeasures?.bodyfat[6]?.value,},
  ];


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

                    <InputField
                      id="age"
                      label="Age"
                      icon={Ruler}
                      value={BodyMeasure.age}
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
                  <LineChart data={data}>
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
                      stroke="#FB923C"
                      strokeWidth={2.5}
                      dot={{ r: 5, fill: '#FB953C' }}
                      activeDot={{ r: 7, fill: '#FED6A' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="BodyFat"
                      name="BodyFat"
                      stroke="#FB923C"
                      strokeWidth={2.5}
                      dot={{ r: 5, fill: '#FB123C' }}
                      activeDot={{ r: 7, fill: '#FED2AA' }}
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
