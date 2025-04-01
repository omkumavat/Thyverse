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
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../../Context/AuthProvider";
import { HelpCircle, X } from "lucide-react";
import { format } from "date-fns";

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
  const { currentUser } = useAuth();
  // Vitals will be stored as an array of records, each with date, systolic, diastolic, and pulse.
  const [vitals, setVitals] = useState([]);
  // New vitals form state
  const [newVitals, setNewVitals] = useState({
    systolic: "",
    diastolic: "",
    pulse: "",
  });
  // Errors for validation
  const [errors, setErrors] = useState({});
  // Loading state for API calls
  const [loading, setLoading] = useState(false);
// Fetch vitals from the backend and transform the data
const fetchVitals = async () => {
  if (!currentUser) return;
  try {
    const response = await axios.get(
      `https://thyverse-backend.vercel.app/server/dashuser/get-vitals/${currentUser._id}`
    );
    if (response.data.success) {
      const data = response.data;
      console.log("Fetched vitals:", data);
      let records = [];
      // Ensure that systolic, diastolic, and pulse are arrays
      if (
        Array.isArray(data.systolic) &&
        Array.isArray(data.diastolic) &&
        Array.isArray(data.pulse)
      ) {
        const len = Math.min(
          data.systolic.length,
          data.diastolic.length,
          data.pulse.length
        );
        for (let i = 0; i < len; i++) {
          records.push({
            // Using systolic's date (assuming all three arrays share the same date)
            date: data.systolic[i].date,
            systolic: data.systolic[i].value,
            diastolic: data.diastolic[i].value,
            pulse: data.pulse[i].value,
          });
        }
      }
      setVitals(records);
    } else {
      toast.error("Failed to fetch vitals");
    }
  } catch (error) {
    console.error("Error fetching vitals:", error);
    toast.error("Error fetching vitals");
  }
};


  useEffect(() => {
    fetchVitals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // Validate inputs and set errors state if invalid
  const validate = () => {
    const err = {};
    if (!newVitals.systolic) {
      err.systolic = "Systolic is required";
    } else if (Number(newVitals.systolic) <= 0) {
      err.systolic = "Systolic must be a positive number";
    }
    if (!newVitals.diastolic) {
      err.diastolic = "Diastolic is required";
    } else if (Number(newVitals.diastolic) <= 0) {
      err.diastolic = "Diastolic must be a positive number";
    }
    if (!newVitals.pulse) {
      err.pulse = "Pulse rate is required";
    } else if (Number(newVitals.pulse) <= 0) {
      err.pulse = "Pulse must be a positive number";
    }
    return err;
  };

  // Handle adding new vitals
  const handleAdd = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors before submitting.");
      return;
    }
    setErrors({});
    setLoading(true);
    const payload = {
      systolic: Number(newVitals.systolic),
      diastolic: Number(newVitals.diastolic),
      pulse: Number(newVitals.pulse),
      date: new Date().toISOString(),
    };
    try {
      const response = await axios.post(
        `https://thyverse-backend.vercel.app/server/dashuser/add-vitals/${currentUser._id}`,
        payload
      );
      if (response.data.success) {
        toast.success("Vitals added successfully!");
        // Re-fetch vitals after a successful addition
        fetchVitals();
        setNewVitals({ systolic: "", diastolic: "", pulse: "" });
      } else {
        toast.error("Failed to add vitals");
      }
    } catch (error) {
      console.error("Error adding vitals:", error);
      toast.error("Error adding vitals");
    }
    setLoading(false);
  };

  // Latest vitals (if any)
  const latestVitals =
    vitals.length > 0
      ? vitals[vitals.length - 1]
      : { systolic: "-", diastolic: "-", pulse: "-" };
  const bpCategory =
    latestVitals.systolic !== "-" ? getBPCategory(latestVitals.systolic, latestVitals.diastolic) : "N/A";

  // Prepare data for the chart (formatting date using date-fns)
  const chartData = vitals.map((vital) => ({
    date: format(new Date(vital.date), "MMM d"),
    systolic: vital.systolic,
    diastolic: vital.diastolic,
    pulse: vital.pulse,
  }));

  return (
    <div className="space-y-8 animate-in">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="grid gap-6 md:grid-cols-2">
        {/* Add New Vitals Form */}
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
                  onChange={(e) =>
                    setNewVitals({ ...newVitals, systolic: e.target.value })
                  }
                  className="w-full p-2 rounded-md border bg-background"
                  placeholder="120"
                  disabled={loading}
                />
                {errors.systolic && (
                  <p className="text-red-500 text-xs mt-1">{errors.systolic}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Diastolic (mmHg)
                </label>
                <input
                  type="number"
                  value={newVitals.diastolic}
                  onChange={(e) =>
                    setNewVitals({ ...newVitals, diastolic: e.target.value })
                  }
                  className="w-full p-2 rounded-md border bg-background"
                  placeholder="80"
                  disabled={loading}
                />
                {errors.diastolic && (
                  <p className="text-red-500 text-xs mt-1">{errors.diastolic}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Pulse Rate (bpm)
              </label>
              <input
                type="number"
                value={newVitals.pulse}
                onChange={(e) =>
                  setNewVitals({ ...newVitals, pulse: e.target.value })
                }
                className="w-full p-2 rounded-md border bg-background"
                placeholder="72"
                disabled={loading}
              />
              {errors.pulse && (
                <p className="text-red-500 text-xs mt-1">{errors.pulse}</p>
              )}
            </div>
            <button
              onClick={handleAdd}
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Vitals"}
            </button>
          </div>
        </div>

        {/* Latest Vitals Display */}
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Latest Blood Pressure</h2>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">
                {latestVitals.systolic}/{latestVitals.diastolic}
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
              <p className="text-2xl font-bold text-primary">{latestVitals.pulse}</p>
              <p className="text-muted-foreground">Pulse Rate (bpm)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vitals History Chart */}
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
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ fill: "#f97316" }}
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke="#84cc16"
                strokeWidth={2}
                dot={{ fill: "#84cc16" }}
              />
              <Line
                type="monotone"
                dataKey="pulse"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ fill: "#06b6d4" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Vitals;
