import React, { useState, useEffect } from "react";
import { Activity, Pill as Pills, Ruler, Thermometer } from "lucide-react";

const Dashboard = () => {
  const [patient, setPatient] = useState({
    name: "John Doe",
    age: 30,
    gender: "male",
    weight: 70,
    height: 175,
    medications: [],
    vitals: [],
    thyroidPanel: { tsh: "N/A" },
  });

  useEffect(() => {
    const storedPatient = JSON.parse(localStorage.getItem("patient"));
    if (storedPatient) {
      setPatient(storedPatient);
    }
  }, []);

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
        <StatCard title="Latest BMI" value={(patient.weight / ((patient.height / 100) ** 2)).toFixed(1)} icon={Ruler} />
        <StatCard 
          title="Latest BP" 
          value={`${patient.vitals[patient.vitals.length - 1]?.systolic || "N/A"}/${patient.vitals[patient.vitals.length - 1]?.diastolic || "N/A"}`} 
          icon={Activity} 
        />
        <StatCard title="Latest TSH" value={`${patient.thyroidPanel?.tsh || "N/A"} mIU/L`} icon={Thermometer} />
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
            {patient.medications.slice(0, 3).map((med) => (
              <div key={med.id} className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Pills className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{med.name}</p>
                  <p className="text-sm text-muted-foreground">{med.dose} - {med.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;