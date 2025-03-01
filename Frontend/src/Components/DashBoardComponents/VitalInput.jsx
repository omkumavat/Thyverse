import React, { useEffect, useState } from "react";
import { Heart, Activity, AlertCircle } from "lucide-react";
import NavBar2 from "../NavBar2";
import Pulse from "../../Images/Pulse.gif";
import Bp from "../../Images/Bp.png";
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../Context/AuthProvider";

function VitalInput() {
  const { currentUser } = useAuth();
  const [systolicArr, setsystolicArr] = useState([]);
  const [diastolicArr, setdiastolicArr] = useState([]);
  const [pulseArr, setpulseArr] = useState([]);
  const [vitals, setVitals] = useState({
    systolic: "",
    diastolic: "",
    pulse: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setVitals((prevVitals) => ({ ...prevVitals, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (vitals.systolic === "" || vitals.diastolic === "" || vitals.pulse === "") {
      toast.error('All Feilds are compulsory');
      return;
    }

    try {
      if (currentUser) {
        const response = await axios.post(`http://localhost:4000/server/dashuser/add-vitals/${currentUser._id}`, vitals);
        if (response.data.success) {
          toast.success("Vitals data saved successfuly.. !");
          setVitals({
            systolic: "",
            diastolic: "",
            pulse: "",
          })
          getVitals();
        } else {
          toast.error("Error saving vitals data.. !");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error saving vitals data.. !");
    }
  };

  async function getVitals() {
    try {
      if (currentUser) {
        const response = await axios.get(`http://localhost:4000/server/dashuser/get-vitals/${currentUser._id}`);
        if (response.data.success) {
          console.log(response.data.pulse);
          setVitals({
            pulse: (response.data.pulse)
          })

          setsystolicArr(response.data.systolic);
          setdiastolicArr(response.data.diastolic);
          setpulseArr(response.data.pulse)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getVitals();
    console.log(vitals.pulse)
  }, [])

  const data = [
    {
      time: systolicArr[0]?.date, systolic: systolicArr[0]?.value, diastolic: diastolicArr[0]?.value,
      pulse: pulseArr[0]?.value
    },
    {
      time: systolicArr[1]?.date, systolic: systolicArr[1]?.value, diastolic: diastolicArr[1]?.value,
      pulse: pulseArr[1]?.value
    },
    {
      time: systolicArr[2]?.date, systolic: systolicArr[2]?.value, diastolic: diastolicArr[2]?.value,
      pulse: pulseArr[2]?.value
    },
    {
      time: systolicArr[3]?.date, systolic: systolicArr[3]?.value, diastolic: diastolicArr[3]?.value,
      pulse: pulseArr[3]?.value
    },
    {
      time: systolicArr[4]?.date, systolic: systolicArr[4]?.value, diastolic: diastolicArr[4]?.value,
      pulse: pulseArr[4]?.value
    },
  ];

  return (
    <div className="bg-gradient-to-br from-orange-600 via-orange-500 to-orange-300 min-h-screen text-gray-100 font-sans">
      <NavBar2 />
      <Toaster position="top-right" reverseOrder={false} />

      <div className="container mx-auto px-4 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 font-poppins gap-8 mt-16">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 bg-opacity-90 rounded-xl shadow-2xl p-6 border border-indigo-900 hover:shadow-orange-500/20 transition-shadow duration-300">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Blood Pressure Section */}
                <div className="flex flex-col md:flex-row items-center gap-6 p-5 bg-gray-800 bg-opacity-60 rounded-xl border border-indigo-800">
                  <div className="w-full md:w-1/3 flex justify-center">
                    <img src={Bp} alt="Blood Pressure" className="h-28 md:h-36 object-contain" />
                  </div>
                  <div className="w-full md:w-2/3 bg-indigo-950 bg-opacity-80 p-5 rounded-lg shadow-md border border-indigo-800">
                    <div className="flex items-center space-x-3 mb-4">
                      <Heart className="h-6 w-6 text-orange-400" />
                      <h2 className="text-xl font-semibold text-gray-50">
                        Blood Pressure
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="systolic"
                          className="block text-sm font-medium text-gray-300 tracking-wide"
                        >
                          Systolic (mmHg)
                        </label>
                        <input
                          max="300"
                          min="0"
                          type="number"
                          id="systolic"
                          value={vitals.systolic}
                          onChange={handleInputChange}
                          className="mt-2 block w-full px-4 py-2 bg-gray-800 border border-indigo-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-gray-100 sm:text-sm transition-all duration-200"
                          placeholder="120"
                        required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="diastolic"
                          className="block text-sm font-medium text-gray-300 tracking-wide"
                        >
                          Diastolic (mmHg)
                        </label>
                        <input
                          max="300"
                          min="0"
                          type="number"
                          id="diastolic"
                          value={vitals.diastolic}
                          onChange={handleInputChange}
                          className="mt-2 block w-full px-4 py-2 bg-gray-800 border border-indigo-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-gray-100 sm:text-sm transition-all duration-200"
                          placeholder="80"
                        required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 p-5 bg-gray-800 bg-opacity-60 rounded-xl border border-indigo-800">
                  <div className="order-2 md:order-1 w-full md:w-2/3 bg-indigo-950 bg-opacity-80 p-5 rounded-lg shadow-md border border-indigo-800">
                    <div className="flex items-center space-x-3 mb-4">
                      <Activity className="h-6 w-6 text-orange-400" />
                      <h2 className="text-xl font-semibold text-gray-50">
                        Pulse Rate
                      </h2>
                    </div>
                    <div>
                      <label
                        htmlFor="pulse"
                        className="block text-sm font-medium text-gray-300 tracking-wide"
                      >
                        Beats per minute (BPM)
                      </label>
                      <input
                        max="100"
                        min="0"
                        type="number"
                        id="pulse"
                        value={vitals.pulse}
                        onChange={handleInputChange}
                        className="mt-2 block w-full px-4 py-2 bg-gray-800 border border-indigo-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-gray-100 sm:text-sm transition-all duration-200"
                        placeholder="72"
                      required
                      />
                    </div>
                  </div>
                  <div className="order-1 md:order-2 w-full md:w-1/3 flex justify-center">
                    <img src={Pulse} alt="Pulse" className="h-28 md:h-36 object-contain" />
                  </div>
                </div>

                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-purple-800 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-all duration-300"
                  >
                    Save Vitals
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Normal Ranges Card */}
            <div className="bg-gray-900 bg-opacity-90 rounded-xl shadow-2xl p-6 border border-indigo-900 hover:shadow-orange-500/20 transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-5">
                <AlertCircle className="h-6 w-6 text-orange-400" />
                <h2 className="text-xl font-semibold text-gray-50">
                  Normal Ranges
                </h2>
              </div>
              <div className="space-y-5">
                <div className="border-l-4 border-orange-400 pl-4">
                  <h3 className="text-sm font-medium text-gray-200">
                    Blood Pressure
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Normal range: 90/60 mmHg to 120/80 mmHg
                  </p>
                </div>
                <div className="border-l-4 border-orange-400 pl-4">
                  <h3 className="text-sm font-medium text-gray-200">
                    Pulse Rate
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Normal range: 60-100 beats per minute
                  </p>
                </div>
              </div>
            </div>

            {/* Vital Trends Chart */}
            <div className="bg-gray-900 bg-opacity-90 rounded-xl shadow-2xl p-6 border border-indigo-900 hover:shadow-orange-500/20 transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-5 text-gray-50">Vital Trends</h2>
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
                      dataKey="systolic"
                      name="Systolic"
                      stroke="#F97316"
                      strokeWidth={2.5}
                      dot={{ r: 5, fill: '#F97316' }}
                      activeDot={{ r: 7, fill: '#FDBA74' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="diastolic"
                      name="Diastolic"
                      stroke="#FB923C"
                      strokeWidth={2.5}
                      dot={{ r: 5, fill: '#FB923C' }}
                      activeDot={{ r: 7, fill: '#FED7AA' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="pulse"
                      name="PulseRate"
                      stroke="#FB923C"
                      strokeWidth={2.5}
                      dot={{ r: 5, fill: '#FB923C' }}
                      activeDot={{ r: 7, fill: '#FED7AA' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VitalInput;