import React, { useState, useEffect } from "react";
import { Activity, Pill as Pills, Ruler, Thermometer } from "lucide-react";
import { useAuth } from '../../Context/AuthProvider';
import axios from 'axios';

const Dashboard = () => {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    medications: [],
    vitals: [],
    thyroidPanel: { tsh: "N/A" },
    bmi: [], // Add BMI array to store BMI history
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        if (currentUser) {
          // Fetch user data
          const userResponse = await axios.get(
            `https://thyverse-backend.vercel.app/server/dashuser/get-user-data/${currentUser._id}`
          );
          
          // Fetch body measurements including BMI
          const measurementsResponse = await axios.get(
            `https://thyverse-backend.vercel.app/server/dashuser/get-body-measures/${currentUser._id}`
          );
          
          // Fetch vitals data
          const vitalsResponse = await axios.get(
            `https://thyverse-backend.vercel.app/server/dashuser/get-vitals/${currentUser._id}`
          );
          
          if (userResponse.data) {
            // Process vitals data
            let vitalsData = [];
            if (vitalsResponse.data.success) {
              const data = vitalsResponse.data;
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
                  vitalsData.push({
                    date: data.systolic[i].date,
                    systolic: data.systolic[i].value,
                    diastolic: data.diastolic[i].value,
                    pulse: data.pulse[i].value,
                  });
                }
              }
            }
            
            setPatient(prevState => ({
              ...userResponse.data,
              bmi: measurementsResponse.data.bmi || [], // Add BMI data from measurements
              vitals: vitalsData, // Add vitals data
            }));
          }
        } else {
          // Load from localStorage if not logged in
          const savedSettings = JSON.parse(localStorage.getItem('patientSettings')) || {};
          const storedMedications = JSON.parse(localStorage.getItem('medications')) || [];
          const storedMeasurements = JSON.parse(localStorage.getItem('measurements')) || [];
          const storedVitals = JSON.parse(localStorage.getItem('vitals')) || [];
          const storedThyroidPanel = JSON.parse(localStorage.getItem('thyroidPanel')) || { tsh: 0, t3: 0, t4: 0 };
          const latestTSH = JSON.parse(localStorage.getItem('latestTSH')) || { value: 0 };
          
          // Get the latest BMI from measurements if available
          let latestBMI = "N/A";
          if (storedMeasurements.length > 0) {
            const latestMeasurement = storedMeasurements[storedMeasurements.length - 1];
            latestBMI = latestMeasurement.bmi.toFixed(1);
          }
          
          setPatient(prevState => ({
            ...prevState,
            name: savedSettings.name || "",
            age: savedSettings.age || "",
            gender: savedSettings.gender || "",
            weight: savedSettings.weight || "",
            height: savedSettings.height || "",
            medications: storedMedications, // Add medications from localStorage
            bmi: storedMeasurements.length > 0 ? [{ value: parseFloat(latestBMI) }] : [], // Add BMI from measurements
            vitals: storedVitals, // Add vitals from localStorage
            thyroidPanel: { tsh: latestTSH.value || storedThyroidPanel.tsh || "N/A" }, // Add TSH from localStorage
          }));
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
        // Fallback to localStorage if API fails
        const savedSettings = JSON.parse(localStorage.getItem('patientSettings')) || {};
        const storedMedications = JSON.parse(localStorage.getItem('medications')) || [];
        const storedMeasurements = JSON.parse(localStorage.getItem('measurements')) || [];
        const storedVitals = JSON.parse(localStorage.getItem('vitals')) || [];
        const storedThyroidPanel = JSON.parse(localStorage.getItem('thyroidPanel')) || { tsh: 0, t3: 0, t4: 0 };
        const latestTSH = JSON.parse(localStorage.getItem('latestTSH')) || { value: 0 };
        
        // Get the latest BMI from measurements if available
        let latestBMI = "N/A";
        if (storedMeasurements.length > 0) {
          const latestMeasurement = storedMeasurements[storedMeasurements.length - 1];
          latestBMI = latestMeasurement.bmi.toFixed(1);
        }
        
        setPatient(prevState => ({
          ...prevState,
          name: savedSettings.name || "",
          age: savedSettings.age || "",
          gender: savedSettings.gender || "",
          weight: savedSettings.weight || "",
          height: savedSettings.height || "",
          medications: storedMedications, // Add medications from localStorage
          bmi: storedMeasurements.length > 0 ? [{ value: parseFloat(latestBMI) }] : [], // Add BMI from measurements
          vitals: storedVitals, // Add vitals from localStorage
          thyroidPanel: { tsh: latestTSH.value || storedThyroidPanel.tsh || "N/A" }, // Add TSH from localStorage
        }));
      }
    };

    fetchPatientData();
  }, [currentUser]);

  // Format medication data for display
  const formatMedication = (med) => {
    // Handle both server and localStorage formats
    return {
      id: med._id || med.id,
      name: med.medication_name || med.name,
      dose: med.medication_dosage || med.dose,
      duration: med.medication_duration || med.duration,
      times: med.medication_schedule || med.times || []
    };
  };

  // Get formatted medications
  const formattedMedications = patient.medications.map(formatMedication);

  // Get the latest BMI value
  const getLatestBMI = () => {
    if (patient.bmi && patient.bmi.length > 0) {
      return patient.bmi[patient.bmi.length - 1].value.toFixed(1);
    }
    // Fallback to calculation if no BMI data is available
    if (patient.weight && patient.height) {
      return (patient.weight / ((patient.height / 100) ** 2)).toFixed(1);
    }
    return "N/A";
  };
  
  // Get the latest blood pressure value
  const getLatestBP = () => {
    if (patient.vitals && patient.vitals.length > 0) {
      const latestVital = patient.vitals[patient.vitals.length - 1];
      return `${latestVital.systolic}/${latestVital.diastolic}`;
    }
    return "N/A";
  };
  
  // Get the latest TSH value
  const getLatestTSH = () => {
    if (patient.thyroidPanel && patient.thyroidPanel.tsh !== "N/A") {
      return patient.thyroidPanel.tsh.toFixed(1);
    }
    return "N/A";
  };

  const StatCard = ({ title, value, icon: Icon }) => (
    <div className="bg-card p-6 rounded-lg shadow-lg transition-all hover:shadow-xl">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 mt-16 animate-in">
      {/* <p>hello</p> */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Medications" value={patient.medications.length.toString()} icon={Pills} />
        <StatCard title="Latest BMI" value={getLatestBMI()} icon={Ruler} />
        <StatCard 
          title="Latest BP" 
          value={getLatestBP()} 
          icon={Activity} 
        />
        <StatCard 
          title="Latest TSH" 
          value={`${getLatestTSH()} mIU/L`} 
          icon={Thermometer} 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
          <div className="space-y-2">
            <p><span className="text-muted-foreground">Name:</span> {patient.name}</p>
            <p><span className="text-muted-foreground">Age:</span> {patient.age} years</p>
            <p><span className="text-muted-foreground">Gender:</span> {patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}</p>
            <p><span className="text-muted-foreground">Weight:</span> {patient.weight} kg</p>
            <p><span className="text-muted-foreground">Height:</span> {patient.height} cm</p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Recent Medications</h2>
          <div className="space-y-4">
            {formattedMedications.length > 0 ? (
              formattedMedications.slice(0, 3).map((med) => (
                <div key={med.id} className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Pills className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{med.name}</p>
                    <p className="text-sm text-muted-foreground">{med.dose} - {med.duration}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No medications added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;