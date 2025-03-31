import React, { useState, useEffect } from "react";
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
// import { format } from "date-fns";

const getBPCategory = (systolic, diastolic) => {
  if (systolic < 90 || diastolic < 60) return "Low Blood Pressure";
  if (systolic < 120 && diastolic < 80) return "Normal";
  if (systolic < 130 && diastolic < 80) return "Elevated";
  if (systolic < 140 || diastolic < 90) return "Hypertension Stage 1";
  if (systolic >= 140 || diastolic >= 90) return "Hypertension Stage 2";
  if (systolic >= 180 || diastolic >= 120) return "Hypertensive Crisis";
  return "Unknown";
};

const Vitals = () => {
  const [vitals, setVitals] = useState([]);
  const [newVitals, setNewVitals] = useState({
    systolic: "",
    diastolic: "",
    pulse: "",
  });

  useEffect(() => {
    const savedVitals = JSON.parse(localStorage.getItem("vitals")) || [];
    setVitals(savedVitals);
  }, []);

  const handleAdd = () => {
    if (newVitals.systolic && newVitals.diastolic && newVitals.pulse) {
      const updatedVitals = [
        ...vitals,
        {
          date: new Date().toISOString(),
          systolic: Number(newVitals.systolic),
          diastolic: Number(newVitals.diastolic),
          pulse: Number(newVitals.pulse),
        },
      ];
      setVitals(updatedVitals);
      localStorage.setItem("vitals", JSON.stringify(updatedVitals));
      setNewVitals({ systolic: "", diastolic: "", pulse: "" });
    }
  };

  const latestBP = vitals[vitals.length - 1] || { systolic: "-", diastolic: "-", pulse: "-" };
  const bpCategory = latestBP.systolic !== "-" ? getBPCategory(latestBP.systolic, latestBP.diastolic) : "N/A";

  const chartData = vitals.map((vital) => ({
    date: format(new Date(vital.date), "MMM d"),
    systolic: vital.systolic,
    diastolic: vital.diastolic,
    pulse: vital.pulse,
  }));

  return (
    <div className="space-y-8 animate-in">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Vitals</h2>
          <div className="space-y-4">
            <div className="grid gap-4 grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Systolic (mmHg)
                </label>
                <input
                  type="number"
                  value={newVitals.systolic}
                  onChange={(e) => setNewVitals({ ...newVitals, systolic: e.target.value })}
                  className="w-full p-2 rounded-md border bg-background"
                  placeholder="120"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Diastolic (mmHg)
                </label>
                <input
                  type="number"
                  value={newVitals.diastolic}
                  onChange={(e) => setNewVitals({ ...newVitals, diastolic: e.target.value })}
                  className="w-full p-2 rounded-md border bg-background"
                  placeholder="80"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Pulse Rate (bpm)
              </label>
              <input
                type="number"
                value={newVitals.pulse}
                onChange={(e) => setNewVitals({ ...newVitals, pulse: e.target.value })}
                className="w-full p-2 rounded-md border bg-background"
                placeholder="72"
              />
            </div>
            <button
              onClick={handleAdd}
              className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Add Vitals
            </button>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Latest Blood Pressure</h2>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">
                {latestBP.systolic}/{latestBP.diastolic}
              </p>
              <p className="text-lg text-muted-foreground">mmHg</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-center font-medium">{bpCategory}</p>
              <p className="text-sm text-muted-foreground text-center mt-1">
                Latest reading category
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{latestBP.pulse}</p>
              <p className="text-muted-foreground">Pulse Rate (bpm)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-6">Vitals History</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="systolic" stroke="#f97316" strokeWidth={2} dot={{ fill: "#f97316" }} />
              <Line type="monotone" dataKey="diastolic" stroke="#84cc16" strokeWidth={2} dot={{ fill: "#84cc16" }} />
              <Line type="monotone" dataKey="pulse" stroke="#06b6d4" strokeWidth={2} dot={{ fill: "#06b6d4" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Vitals;
