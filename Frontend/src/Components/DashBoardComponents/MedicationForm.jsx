import React, { useEffect, useState } from "react";
import { Pill, Activity, Clock } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import NavBar2 from '../NavBar2';
import { Toaster, toast } from 'react-hot-toast';
import { useAuth } from '../../Context/AuthProvider';
import axios from 'axios';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
import useFetchUpdatedUser from '../../IMPFunctions/ProfileUpdation';

function MedicationForm() {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    medication: '',
    dosage: '',
    startDate: '',
    duration: '',
    times: [] // For checkbox selections
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const currentTimes = formData.times;
    if (e.target.checked) {
      setFormData({ ...formData, times: [...currentTimes, value] });
    } else {
      setFormData({ ...formData, times: currentTimes.filter((time) => time !== value) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentUser) {
        const response = await axios.post(
          `http://localhost:4000/server/dashuser/add-medi/${currentUser._id}`,
          formData
        );
        if (response.data.success) {
          toast.success("Medication saved.. !");
          fetchMediForGraph(); // Refresh the charts data
          // Reset form including checkboxes
          setFormData({
            medication: '',
            dosage: '',
            startDate: '',
            duration: '',
            times: []
          });
        } else {
          toast.error("Failed to save.. !");
        }
      }
    } catch (error) {
      toast.error("Failed to save.. !");
    }
  };

  useFetchUpdatedUser();

  // Initialize pie chart state with empty details.
  // "details" will hold an array of medication names per time slot.
  const [pieChartData, setPieChartData] = useState({
    labels: ['Morning', 'Afternoon', 'Night'],
    datasets: [{
      data: [0, 0, 0],
      details: [[], [], []],
      backgroundColor: [
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(54, 162, 235, 0.8)',
      ],
      borderColor: [
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    }],
  });

  // Initialize bar chart state.
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Medication Dosage',
      data: [],
      backgroundColor: 'rgba(255, 147, 47, 0.8)',
      borderColor: 'rgba(255, 147, 47, 1)',
      borderWidth: 1,
    }],
  });

  // Fetch medications and update both charts in one call.
  async function fetchMediForGraph() {
    try {
      if (currentUser) {
        const response = await axios.get(`http://localhost:4000/server/dashuser/get-medi-graph/${currentUser._id}`);
        // Assume response.data.medications is an array of medication objects.
        const medications = response.data.medications;

        // Aggregation for pie chart.
        // We'll create a schedule object mapping time slots to an array of medication names.
        const schedule = {
          Morning: [],
          Afternoon: [],
          Night: []
        };

        // Aggregation for bar chart (for example, using medication names and dosages).
        const names = [];
        const dosages = [];

        medications.forEach(med => {
          names.push(med.medication_name);
          dosages.push(med.medication_dosage);
          // For each medication, add its name to each time slot in its schedule.
          if (med.medication_schedule && Array.isArray(med.medication_schedule)) {
            med.medication_schedule.forEach(time => {
              if (schedule.hasOwnProperty(time)) {
                schedule[time].push(med.medication_name);
              }
            });
          }
        });

        setBarChartData({
          labels: names,
          datasets: [{
            label: 'Medication Dosage',
            data: dosages,
            backgroundColor: 'rgba(255, 147, 47, 0.8)',
            borderColor: 'rgba(255, 147, 47, 1)',
            borderWidth: 1,
          }]
        });

        // Update the pie chart. The numeric data is the count of medications for each time slot,
        // and the "details" property holds the actual medication names.
        setPieChartData({
          labels: ['Morning', 'Afternoon', 'Night'],
          datasets: [{
            data: [
              schedule.Morning.length,
              schedule.Afternoon.length,
              schedule.Night.length,
            ],
            details: [
              schedule.Morning,
              schedule.Afternoon,
              schedule.Night,
            ],
            backgroundColor: [
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(54, 162, 235, 0.8)',
            ],
            borderColor: [
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          }]
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMediForGraph();
  }, [currentUser]);

  return (
    <div>
      <div>
        <NavBar2 />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-br from-orange-600 to-orange-400 p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14">
          <div className="bg-[#000042]/80 h-[110vh] rounded-xl p-6 shadow-lg font-poppins ">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
              <Pill className="mr-2" /> Medication Form
            </h2>

            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="bg-[#000042] p-4 rounded-md">
                <label className="block text-white mb-1">Medication Name</label>
                <input
                  type="text"
                  name="medication"
                  value={formData.medication}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-orange-400 bg-[#000042] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter medication name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#000042] p-4 rounded-md">
                  <label className="block text-white mb-1">Dosage</label>
                  <input
                    type="text"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-orange-400 bg-[#000042] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter dosage (mg)"
                  />
                </div>
                <div className="bg-[#000042] p-4 rounded-md">
                  <p className="text-white mb-2">Select Medication Times:</p>
                  <div className="flex space-x-4">
                    <label className="text-white">
                      <input
                        type="checkbox"
                        name="times"
                        value="Morning"
                        onChange={handleCheckboxChange}
                        checked={formData.times.includes("Morning")}
                        className="mr-2"
                      />
                      Morning
                    </label>
                    <label className="text-white">
                      <input
                        type="checkbox"
                        name="times"
                        value="Afternoon"
                        onChange={handleCheckboxChange}
                        checked={formData.times.includes("Afternoon")}
                        className="mr-2"
                      />
                      Afternoon
                    </label>
                    <label className="text-white">
                      <input
                        type="checkbox"
                        name="times"
                        value="Night"
                        onChange={handleCheckboxChange}
                        checked={formData.times.includes("Night")}
                        className="mr-2"
                      />
                      Night
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#000042] p-4 rounded-md">
                  <label className="block text-white mb-1">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-orange-400 bg-[#000042] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="bg-[#000042] p-4 rounded-md">
                  <label className="block text-white mb-1">Duration (days)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-orange-400 bg-[#000042] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Number of days"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200"
              >
                Submit Medication
              </button>
            </form>
          </div>

          <div className="space-y-8 font-poppins">
            <div className="bg-[#000042]/80 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                <Clock className="mr-2" /> Daily Medication Schedule
              </h3>
              <div className="w-full h-[300px] flex items-center justify-center">
                <Pie
                  data={pieChartData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { labels: { color: 'white' } },
                      tooltip: {
                        callbacks: {
                          // On hover, show the medication names for that time slot.
                          label: function(context) {
                            const index = context.dataIndex;
                            const details = context.dataset.details[index];
                            return details && details.length > 0
                              ? details.join(', ')
                              : 'No medications';
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="bg-[#000042]/80 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                <Activity className="mr-2" /> Weekly Adherence
              </h3>
              <div className="w-full h-[300px] flex items-center justify-center">
                <Bar
                  data={barChartData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'white' },
                      },
                      x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: 'white' },
                      },
                    },
                    plugins: {
                      legend: { labels: { color: 'white' } },
                      tooltip: {
                        callbacks: {
                          label: function (context) {
                            const label = context.dataset.label ? context.dataset.label + ': ' : '';
                            return context.parsed.y !== null
                              ? label + context.parsed.y + ' mg'
                              : label;
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicationForm;
