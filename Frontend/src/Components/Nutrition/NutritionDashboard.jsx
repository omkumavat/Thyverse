import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Droplets, Target, Scale } from "lucide-react";
const NutritionDashboard = () => {
  const macroData = [
    { name: "Protein", value: 25 },
    { name: "Carbs", value: 45 },
    { name: "Fats", value: 30 },
  ];

  const COLORS = ["#FF9800", "#E65100", "#FFF3E0"];

  const nutrientData = [
    { name: "Vitamin A", current: 80, target: 100 },
    { name: "Vitamin C", current: 120, target: 100 },
    { name: "Iron", current: 60, target: 100 },
    { name: "Calcium", current: 90, target: 100 },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Daily Goals
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Calories
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                1,400 / 2,000 kcal
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Protein
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                120g / 150g
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Macronutrients
            </h2>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Water Intake
            </h2>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
              <div
                className="absolute inset-0 border-4 border-primary rounded-full"
                style={{
                  clipPath: "polygon(0 60%, 100% 60%, 100% 100%, 0% 100%)",
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  1.5L
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              of 2.5L daily goal
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Nutrient Intake
        </h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={nutrientData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" name="Current" fill="#FF9800" />
              <Bar dataKey="target" name="Target" fill="#E65100" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default NutritionDashboard;
