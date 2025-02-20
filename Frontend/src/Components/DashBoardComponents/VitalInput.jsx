import React, { useState } from "react";
import { Heart, Activity, AlertCircle } from "lucide-react";
import NavBar from "../NavBar";
import Pulse from "../../Images/Pulse.gif";
import Bp from "../../Images/Bp.png";
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
function VitalInput() {
  const [vitals, setVitals] = useState({
    systolic: "",
    diastolic: "",
    pulse: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setVitals((prevVitals) => ({ ...prevVitals, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted vitals:", vitals);
    // Send data to backend here
  };
  const data = [
    { time: "10:00", systolic: 120, diastolic: 80 },
    { time: "10:30", systolic: 118, diastolic: 78 },
    { time: "11:00", systolic: 122, diastolic: 82 },
    { time: "11:30", systolic: 121, diastolic: 81 },
    { time: "12:00", systolic: 119, diastolic: 79 },
  ];
  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-300">
      <div>
        <NavBar />
      </div>
      <div className="min-h-screen  ">
        {/* Main div */}
        <div className="flex">
          {/* left part */}
          <div className="mt-4 overflow-clip">
            <main className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col justify-center">
              <header className="bg-white shadow-sm flex justify-center items-center">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center space-x-2">
                  <Activity className="h-8 w-8 text-blue-600" />
                  <h1 className="text-2xl font-poppins font-bold text-gray-900">
                    Vital Signs Monitor
                  </h1>
                </div>
              </header>
              <div className=" rounded-md">
                {/* Form Section */}
                <div className="bg-white rounded-md shadow-lg p-6 font-poppins ">
                  <div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Blood Pressure Section */}
                      <div className="flex justify-evenly items-center gap-x-6 ">
                        <div className="">
                          <img src={Bp} />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-y-4 bg-gray-400 p-2 !rounded-md">
                          <div className="flex items-center space-x-2">
                            <Heart className="h-6 w-6 text-red-500" />
                            <h2 className="text-xl font-semibold text-gray-900">
                              Blood Pressure
                            </h2>
                          </div>
                          <div className="grid grid-cols-2 gap-4 h-[100px]">
                            <div>
                              <label
                                htmlFor="systolic"
                                className="block text-lg font-medium text-gray-700"
                              >
                                Systolic (mmHg)
                              </label>
                              <input
                                type="number"
                                id="systolic"
                                value={vitals.systolic}
                                onChange={handleInputChange}
                                className="mt-1 block w-full h-8 p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
                                placeholder="120"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="diastolic"
                                className="block text-lg font-medium text-gray-700"
                              >
                                Diastolic (mmHg)
                              </label>
                              <input
                                type="number"
                                id="diastolic"
                                value={vitals.diastolic}
                                onChange={handleInputChange}
                                className="mt-1 block w-full h-8 p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
                                placeholder="80"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pulse Section */}

                      <div className="flex justify-evenly items-center gap-x-6 ">
                        <div className="flex flex-col justify-center items-center rounded-md h-[150px] bg-gray-400 p-4">
                          <div className="flex items-center space-x-2">
                            <Activity className="h-6 w-6 text-red-500" />
                            <h2 className="text-xl font-semibold text-gray-900">
                              Pulse Rate
                            </h2>
                          </div>
                          <div>
                            <label
                              htmlFor="pulse"
                              className="block text-lg font-medium text-gray-700"
                            >
                              Beats per minute (BPM)
                            </label>
                            <input
                              type="number"
                              id="pulse"
                              value={vitals.pulse}
                              onChange={handleInputChange}
                              className="mt-1 block w-full h-8 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
                              placeholder="72"
                              required
                            />
                          </div>
                        </div>
                        <div className="w-[50%]">
                          <img src={Pulse} height={150} />
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <button
                          type="submit"
                          className="w-fit flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save Vitals
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Information Section */}
              </div>
            </main>
          </div>
          {/* right part */}
          <div className="flex flex-col justify-center items-center gap-y-5">
            {/* upper part */}
            <div className="">
              <div className=" font-poppins w-full">
                <div className="bg-white rounded-md shadow-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <AlertCircle className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Normal Ranges
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Blood Pressure
                      </h3>
                      <p className="text-gray-600">
                        Normal range: 90/60 mmHg to 120/80 mmHg
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Pulse Rate
                      </h3>
                      <p className="text-gray-600">
                        Normal range: 60-100 beats per minute
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* lower part */}
            <div>
              <div className="bg-white rounded-md shadow-lg p-6 ">
                <h2 className="text-xl font-semibold mb-4">Vital Trends</h2>
                <ResponsiveContainer height={300} width={400}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="systolic"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="diastolic"
                      stroke="#82ca9d"
                      strokeWidth={2}
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
