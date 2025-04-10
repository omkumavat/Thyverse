import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Scale, Target } from "lucide-react";
const Progress = () => {
  const weightData = [
    { date: "2024-02-01", weight: 75 },
    { date: "2024-02-08", weight: 74.5 },
    { date: "2024-02-15", weight: 73.8 },
    { date: "2024-02-22", weight: 73.2 },
    { date: "2024-03-01", weight: 72.5 },
  ];

  const calorieData = [
    { date: "2024-02-25", target: 2000, actual: 1850 },
    { date: "2024-02-26", target: 2000, actual: 2100 },
    { date: "2024-02-27", target: 2000, actual: 1950 },
    { date: "2024-02-28", target: 2000, actual: 2050 },
    { date: "2024-02-29", target: 2000, actual: 1900 },
    { date: "2024-03-01", target: 2000, actual: 2000 },
  ];
  return (
    <div className="space-y-6 mt-16">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Progress Tracking
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Weight Progress
            </h2>
          </div>
          <div className="text-center mb-4">
            <p className="text-3xl font-bold text-primary">-2.5 kg</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Total Loss
            </p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#FF9800"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Calorie Tracking
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={calorieData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#E65100"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#FF9800"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Weekly Summary
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Average Daily Calories
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                1,975 kcal
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Protein Goal Achievement
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                85%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Workout Consistency
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                75%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Monthly Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Starting Weight
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              75.0 kg
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Current Weight
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              72.5 kg
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Target Weight
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              70.0 kg
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
