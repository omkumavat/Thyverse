import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

const Medications = () => {
    const [medications, setMedications] = useState([]);
    const [newMed, setNewMed] = useState({ name: '', dose: '', duration: '' });

    useEffect(() => {
        const savedMedications = JSON.parse(localStorage.getItem('medications')) || [];
        setMedications(savedMedications);
    }, []);

    useEffect(() => {
        localStorage.setItem('medications', JSON.stringify(medications));
    }, [medications]);

    const handleAdd = () => {
        if (newMed.name && newMed.dose && newMed.duration) {
            const updatedMedications = [
                ...medications,
                { id: Date.now().toString(), ...newMed }
            ];
            setMedications(updatedMedications);
            setNewMed({ name: '', dose: '', duration: '' });
        }
    };

    const handleRemove = (id) => {
        setMedications(medications.filter(med => med.id !== id));
    };

    return (
        <div className="space-y-8 animate-in">
            <div className="bg-card p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Add New Medication</h2>
                <div className="grid gap-4 md:grid-cols-3">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">Medication Name</label>
                        <input
                            type="text"
                            value={newMed.name}
                            onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                            className="w-full p-2 rounded-md border bg-background"
                            placeholder="e.g., Levothyroxine"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">Dose</label>
                        <input
                            type="text"
                            value={newMed.dose}
                            onChange={(e) => setNewMed({ ...newMed, dose: e.target.value })}
                            className="w-full p-2 rounded-md border bg-background"
                            placeholder="e.g., 50mcg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">Duration</label>
                        <input
                            type="text"
                            value={newMed.duration}
                            onChange={(e) => setNewMed({ ...newMed, duration: e.target.value })}
                            className="w-full p-2 rounded-md border bg-background"
                            placeholder="e.g., 1 month"
                        />
                    </div>
                </div>
                <button
                    onClick={handleAdd}
                    className="mt-4 inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Medication
                </button>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Current Medications</h2>
                <div className="space-y-4">
                    {medications.map((med) => (
                        <div
                            key={med.id}
                            className="flex items-center justify-between p-4 bg-muted rounded-lg group hover:bg-muted/80 transition-colors"
                        >
                            <div>
                                <h3 className="font-medium">{med.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {med.dose} - {med.duration}
                                </p>
                            </div>
                            <button
                                onClick={() => handleRemove(med.id)}
                                className="opacity-0 group-hover:opacity-100 p-2 text-destructive hover:bg-destructive/10 rounded-full transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    {medications.length === 0 && (
                        <p className="text-center text-muted-foreground">No medications added yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Medications;
