import React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Pill as Pills,
  Ruler,
  Heart,
  FlaskRound as Flask,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
const vitalsData = [
  { name: "Mon", bp: 120, pulse: 72 },
  { name: "Tue", bp: 125, pulse: 75 },
  { name: "Wed", bp: 118, pulse: 70 },
  { name: "Thu", bp: 122, pulse: 73 },
  { name: "Fri", bp: 121, pulse: 71 },
];

const medicationData = [
  { name: "Metformin", value: 35 },
  { name: "Lisinopril", value: 25 },
  { name: "Aspirin", value: 20 },
  { name: "Vitamin D", value: 20 },
];

const bodyMeasurements = [
  { name: "Weight", value: 75 },
  { name: "Height", value: 175 },
  { name: "BMI", value: 24.5 },
  { name: "Body Fat %", value: 22 },
];

const thyroidData = [
  { name: "TSH", value: 2.5, range: "0.4-4.0" },
  { name: "T4", value: 1.2, range: "0.8-1.8" },
  { name: "T3", value: 3.1, range: "2.3-4.2" },
];

const COLORS = ["#FF9F43", "#1B2B65", "#FF7A00", "#324185"];

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1B2B65] text-white p-6 flex justify-between items-center">
        <div className="max-w-7xl">
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <p className="text-orange-300">John Doe - ID: 12345</p>
        </div>
        <div className="flex items-center gap-x-4 text-xl font-bold font-poppins">
        <p onClick={() => navigate("/dashboard/vitalinput")} className="cursor-pointer">My Vitals</p>
        <p onClick={() => navigate("/dashboard/medication")} className="cursor-pointer">My Medications</p>
        </div>
      </header>

      {/* Dashboard Grid */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vitals Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <Heart className="text-[#FF9F43]" />
            <h2 className="text-xl font-semibold text-[#1B2B65]">Vitals</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={vitalsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bp" stroke="#FF9F43" />
              <Line type="monotone" dataKey="pulse" stroke="#1B2B65" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Medications Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <Pills className="text-[#FF9F43]" />
            <h2 className="text-xl font-semibold text-[#1B2B65]">
              Medications
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={medicationData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {medicationData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Body Measurements Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <Ruler className="text-[#FF9F43]" />
            <h2 className="text-xl font-semibold text-[#1B2B65]">
              Body Measurements
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={bodyMeasurements}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#FF9F43" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Thyroid Panel Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <Flask className="text-[#FF9F43]" />
            <h2 className="text-xl font-semibold text-[#1B2B65]">
              Thyroid Panel
            </h2>
          </div>
          <div className="space-y-4">
            {thyroidData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <span className="text-[#1B2B65] font-medium">{item.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-[#FF9F43] font-bold">{item.value}</span>
                  <span className="text-gray-500 text-sm">
                    Range: {item.range}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default Dashboard;
