import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import MedicationList from './MedicationList';
import { useAuth } from '../../Context/AuthProvider';
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast";

const Medications = () => {
  const [medicationData, setMedicationData] = useState([]);
  const [newMed, setNewMed] = useState({
    name: '',
    dose: '',
    startdate: "",
    duration: '',
    times: [],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();

  async function fetchMedications() {
    try {
      if (currentUser) {
        const response = await axios.get(
          `https://thyverse-backend.vercel.app/server/dashuser/get-medi-graph/${currentUser._id}`
        );
        console.log(response.data.medications);
        setMedicationData(response.data.medications);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMedications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!newMed.name.trim()) {
      newErrors.name = "Medication name is required";
    }
    if (!newMed.dose.trim()) {
      newErrors.dose = "Dose is required";
    }
    if (!newMed.duration.trim()) {
      newErrors.duration = "Duration is required";
    }
    if (!newMed.startdate) {
      newErrors.startdate = "Start date is required";
    }
    if (!newMed.times || newMed.times.length === 0) {
      newErrors.times = "Select at least one medication time";
    }
    return newErrors;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) {
      // Show a toast message if there are validation errors
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (currentUser) {
        const response = await axios.post(
          `https://thyverse-backend.vercel.app/server/dashuser/add-medi/${currentUser._id}`,
          {
            medication: newMed.name,
            dosage: newMed.dose,
            times: newMed.times,
            startDate: newMed.startdate,
            duration: newMed.duration
          }
        );
        if (response.data.success) {
          toast.success("Medication saved!");
          fetchMedications();
          setNewMed({
            name: "",
            dose: "",
            startdate: "",
            duration: "",
            times: [],
          });
          setErrors({});
        } else {
          toast.error("Failed to save medication.");
        }
      }
    } catch (error) {
      toast.error("Failed to save medication.");
    }
    setIsSubmitting(false);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const currentTimes = newMed.times;
    if (e.target.checked) {
      setNewMed({ ...newMed, times: [...currentTimes, value] });
    } else {
      setNewMed({
        ...newMed,
        times: currentTimes.filter((time) => time !== value),
      });
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="space-y-8 animate-in">
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Medication</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {/* Medication Name */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Medication Name
              </label>
              <input
                type="text"
                value={newMed.name}
                onChange={(e) =>
                  setNewMed({ ...newMed, name: e.target.value })
                }
                disabled={isSubmitting}
                className="w-full p-2 rounded-md border bg-background"
                placeholder="e.g., Levothyroxine"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            {/* Dose */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Dose
              </label>
              <input
                type="text"
                value={newMed.dose}
                onChange={(e) =>
                  setNewMed({ ...newMed, dose: e.target.value })
                }
                disabled={isSubmitting}
                className="w-full p-2 rounded-md border bg-background"
                placeholder="e.g., 50mcg"
              />
              {errors.dose && (
                <p className="text-red-500 text-sm">{errors.dose}</p>
              )}
            </div>
            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Duration
              </label>
              <input
                type="text"
                value={newMed.duration}
                onChange={(e) =>
                  setNewMed({ ...newMed, duration: e.target.value })
                }
                disabled={isSubmitting}
                className="w-full p-2 rounded-md border bg-background"
                placeholder="e.g., 1 month"
              />
              {errors.duration && (
                <p className="text-red-500 text-sm">{errors.duration}</p>
              )}
            </div>
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={newMed.startdate}
                onChange={(e) =>
                  setNewMed({ ...newMed, startdate: e.target.value })
                }
                disabled={isSubmitting}
                className="w-full p-2 rounded-md border bg-background"
              />
              {errors.startdate && (
                <p className="text-red-500 text-sm">{errors.startdate}</p>
              )}
            </div>
            {/* Medication Times */}
            <div className="bg-[#000042] p-4 rounded-md w-80">
              <p className="text-white mb-2">Select Medication Times:</p>
              <div className="flex space-x-4">
                <label className="text-white">
                  <input
                    type="checkbox"
                    name="times"
                    value="Morning"
                    onChange={handleCheckboxChange}
                    checked={newMed.times.includes("Morning")}
                    disabled={isSubmitting}
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
                    checked={newMed.times.includes("Afternoon")}
                    disabled={isSubmitting}
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
                    checked={newMed.times.includes("Night")}
                    disabled={isSubmitting}
                    className="mr-2"
                  />
                  Night
                </label>
              </div>
              {errors.times && (
                <p className="text-red-500 text-sm">{errors.times}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleAdd}
            disabled={isSubmitting}
            className="mt-4 inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            Add Medication
          </button>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Current Medications</h2>
          <div className="space-y-4">
            <MedicationList
              fetchMedications={fetchMedications}
              medicationData={medicationData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Medications;
