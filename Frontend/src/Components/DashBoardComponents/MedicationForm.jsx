import React, { useEffect, useState } from 'react';
import { Pill, Activity, Clock } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import NavBar from '../NavBar';
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
    frequency: '',
    startDate: '',
    duration: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentUser) {
        const response = await axios.post(`http://localhost:4000/server/dashuser/add-medi/${currentUser._id}`, formData)

        if (response.data.success) {
          toast.success("Medication saved.. !")
          fetchMediForGraph();
          setFormData({
            medication: '',
            dosage: '',
            frequency: '',
            startDate: '',
            duration: ''
          })
        } else {
          toast.error("Failed to save.. !")
        }
      }
    } catch (error) {
      toast.error("Failed to save.. !")
    }
  }
  useFetchUpdatedUser();
  const pieChartData = {
    labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
    datasets: [{
      data: [30, 25, 25, 20],
      backgroundColor: [
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(54, 162, 235, 0.8)',
      ],
      borderColor: [
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    }],
  };

  const [barChartData, setbarChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Medication Adherence',
      data: [],
      backgroundColor: 'rgba(255, 147, 47, 0.8)',
      borderColor: 'rgba(255, 147, 47, 1)',
      borderWidth: 1,
    }],
  });

  async function fetchMediForGraph() {
    try {
      if (currentUser) {
        const response = await axios.get(`http://localhost:4000/server/dashuser/get-medi-graph/${currentUser._id}`);
        const data = response.data;
        setbarChartData((prev) => ({
          ...prev,
          labels: data.names,
          datasets: [
            {
              ...prev.datasets[0],
              data: data.dosages,
            },
          ],
        }));
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
        <NavBar />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-br from-orange-600 to-orange-400 p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14">
          <div className="bg-[#000042]/80 h-[110vh] rounded-xl p-6 shadow-lg font-poppins ">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
              <Pill className="mr-2" /> Medication Form
            </h2>

            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className='bg-[#000042] p-4 rounded-md'>
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
                <div className='bg-[#000042] p-4 rounded-md'>
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
                <div className='bg-[#000042] p-4 rounded-md'>
                  <label className="block text-white mb-1">Frequency</label>
                  <input
                    type="text"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-orange-400 bg-[#000042] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Times per day"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className='bg-[#000042] p-4 rounded-md'>
                  <label className="block text-white mb-1">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-orange-400 bg-[#000042] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className='bg-[#000042] p-4 rounded-md'>
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
                <Pie data={pieChartData} options={{ maintainAspectRatio: false, plugins: { legend: { labels: { color: 'white' } } } }} />
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
                      legend: {
                        labels: { color: 'white' },
                      },
                      tooltip: {
                        callbacks: {
                          label: function (context) {
                            let label = context.dataset.label ? context.dataset.label + ': ' : '';
                            if (context.parsed.y !== null) {
                              label += context.parsed.y + ' mg';
                            }
                            return label;
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
