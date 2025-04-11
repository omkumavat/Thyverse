import React, { useState, useEffect, useRef } from 'react';
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
  const isMounted = useRef(true);

  // Cleanup function to prevent state updates after unmounting
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchMedications = async () => {
    if (!isMounted.current) return;
    
    try {
      if (currentUser) {
        const response = await axios.get(
          `https://thyverse-backend.vercel.app/server/dashuser/get-medi-graph/${currentUser._id}`
        );
        if (isMounted.current && response.data.medications) {
          setMedicationData(response.data.medications);
        }
      } else {
        // Load from localStorage if not logged in
        const storedMedications = JSON.parse(localStorage.getItem('medications')) || [];
        if (isMounted.current) {
          setMedicationData(storedMedications);
        }
      }
    } catch (error) {
      console.error("Error fetching medications:", error);
      // Fallback to localStorage if API fails
      if (isMounted.current) {
        const storedMedications = JSON.parse(localStorage.getItem('medications')) || [];
        setMedicationData(storedMedications);
      }
    }
  };

  useEffect(() => {
    fetchMedications();
  }, [currentUser]);

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

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    setNewMed(prevState => {
      const updatedTimes = isChecked 
        ? [...prevState.times, value]
        : prevState.times.filter(time => time !== value);
      
      return {
        ...prevState,
        times: updatedTimes
      };
    });
  };

  const saveToLocalStorage = (medicationData) => {
    try {
      // Get existing medications from localStorage
      const storedMedications = JSON.parse(localStorage.getItem('medications')) || [];
      
      // Create new medication object
      const newMedication = {
        id: Date.now(),
        name: medicationData.medication,
        dose: medicationData.dosage,
        times: medicationData.times,
        startDate: medicationData.startDate,
        duration: medicationData.duration
      };
      
      // Add new medication to the array
      const updatedMedications = [...storedMedications, newMedication];
      
      // Save back to localStorage
      localStorage.setItem('medications', JSON.stringify(updatedMedications));
      
      // Update state
      setMedicationData(updatedMedications);
      
      // Show success message
      toast.success("Medication saved successfully!", {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#4CAF50',
          color: '#fff',
        },
      });
      
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      toast.error("Failed to save medication");
      return false;
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validate();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare medication data
      const medicationData = {
        medication: newMed.name,
        dosage: newMed.dose,
        times: newMed.times,
        startDate: newMed.startdate,
        duration: newMed.duration,
        userId: currentUser?._id
      };

      let saved = false;

      // Try to save to server if logged in
      if (currentUser) {
        try {
          const response = await axios.post(
            `https://thyverse-backend.vercel.app/server/dashuser/add-medication/${currentUser._id}`,
            medicationData
          );

          if (response.data.success) {
            toast.success("Medication added successfully!", {
              duration: 3000,
              position: 'top-center',
              style: {
                background: '#4CAF50',
                color: '#fff',
              },
            });
            await fetchMedications();
            saved = true;
          }
        } catch (serverError) {
          console.error("Server error:", serverError);
          // Fall back to localStorage if server fails
          saved = saveToLocalStorage(medicationData);
        }
      } else {
        // Save to localStorage if not logged in
        saved = saveToLocalStorage(medicationData);
      }

      // Reset form if saved successfully
      if (saved) {
        setNewMed({
          name: "",
          dose: "",
          startdate: "",
          duration: "",
          times: [],
        });
        setErrors({});
      }
    } catch (error) {
      console.error("Error in handleAdd:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="space-y-8 mt-16 animate-in">
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Medication</h2>
          <form onSubmit={handleAdd} className="grid gap-4 md:grid-cols-3">
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
                <label className="text-white flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="times"
                    value="Morning"
                    onChange={handleCheckboxChange}
                    checked={newMed.times.includes("Morning")}
                    disabled={isSubmitting}
                    className="mr-2 h-5 w-5 cursor-pointer"
                  />
                  Morning
                </label>
                <label className="text-white flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="times"
                    value="Afternoon"
                    onChange={handleCheckboxChange}
                    checked={newMed.times.includes("Afternoon")}
                    disabled={isSubmitting}
                    className="mr-2 h-5 w-5 cursor-pointer"
                  />
                  Afternoon
                </label>
                <label className="text-white flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="times"
                    value="Night"
                    onChange={handleCheckboxChange}
                    checked={newMed.times.includes("Night")}
                    disabled={isSubmitting}
                    className="mr-2 h-5 w-5 cursor-pointer"
                  />
                  Night
                </label>
              </div>
              {errors.times && (
                <p className="text-red-500 text-sm mt-2">{errors.times}</p>
              )}
            </div>
            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                Add Medication
              </button>
            </div>
          </form>
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
