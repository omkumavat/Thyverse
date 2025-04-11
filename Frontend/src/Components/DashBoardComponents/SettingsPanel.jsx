import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import { useTheme } from '../../Context/ThemeContext';
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast";

const SettingsPanel = () => {
  const [values, setValues] = useState({
    name: '',
    age: '',
    gender: 'male',
    weight: '',
    height: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    // Load initial settings from API
    const fetchUserData = async () => {
      try {
        if (currentUser) {
          const response = await axios.get(
            `https://thyverse-backend.vercel.app/server/dashuser/get-user-data/${currentUser._id}`
          );
          if (response.data) {
            setValues({
              name: response.data.name || '',
              age: response.data.age || '',
              gender: response.data.gender || 'male',
              weight: response.data.weight || '',
              height: response.data.height || '',
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fallback to localStorage if API fails
        const savedSettings = JSON.parse(localStorage.getItem('patientSettings')) || {
          name: '',
          age: '',
          gender: 'male',
          weight: '',
          height: '',
        };
        setValues(savedSettings);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      if (currentUser) {
        // Save to backend
        const response = await axios.post(
          `https://thyverse-backend.vercel.app/server/dashuser/update-user-data/${currentUser._id}`,
          {
            name: values.name,
            age: values.age,
            gender: values.gender,
            weight: values.weight,
            height: values.height,
          }
        );
        
        if (response.data.success) {
          // Also save to localStorage as backup
          localStorage.setItem('patientSettings', JSON.stringify(values));
          toast.success('Profile settings saved successfully!');
        } else {
          toast.error(response.data.message || 'Failed to save profile settings');
        }
      } else {
        // If no user is logged in, just save to localStorage
        localStorage.setItem('patientSettings', JSON.stringify(values));
        toast.success('Profile settings saved to local storage!');
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      // Fallback to localStorage if API fails
      localStorage.setItem('patientSettings', JSON.stringify(values));
      toast.error('Failed to save to server, but saved to local storage');
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="space-y-8 mt-16 animate-in">
        <div className="max-w-2xl">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                <input
                  type="text"
                  value={values.name}
                  onChange={(e) => setValues({ ...values, name: e.target.value })}
                  className="w-full p-2 rounded-md border bg-background"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Age</label>
                <input
                  type="number"
                  value={values.age}
                  onChange={(e) => setValues({ ...values, age: Number(e.target.value) })}
                  className="w-full p-2 rounded-md border bg-background"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Gender</label>
                <select
                  value={values.gender}
                  onChange={(e) => setValues({ ...values, gender: e.target.value })}
                  className="w-full p-2 rounded-md border bg-background"
                  disabled={isSubmitting}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={values.weight}
                  onChange={(e) => setValues({ ...values, weight: Number(e.target.value) })}
                  className="w-full p-2 rounded-md border bg-background"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={values.height}
                  onChange={(e) => setValues({ ...values, height: Number(e.target.value) })}
                  className="w-full p-2 rounded-md border bg-background"
                  disabled={isSubmitting}
                />
              </div>
              <button
                onClick={handleSave}
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>

          <div className="mt-6 bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Dark Mode</span>
              <button
                onClick={toggleTheme}
                className={`w-12 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-primary' : 'bg-muted'}`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                    isDarkMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;
