import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../Context/AuthProvider';
import DeleteModalMedication from './DeleteModalMedication';

// Modal Component for Editing Medication
const EditMedicationModal = ({ medication, isOpen, onClose, onUpdate, onUpdate2, isLocalStorage }) => {
  const [editData, setEditData] = useState({
    medication: medication.medication_name || medication.name,
    dosage: medication.medication_dosage || medication.dose,
    startDate: medication.medication_date ? medication.medication_date.split('T')[0] : medication.startDate,
    duration: medication.medication_duration || medication.duration,
    times: medication.medication_schedule || medication.times || []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const currentTimes = editData.times;

    if (e.target.checked) {
      setEditData(prev => ({ ...prev, times: [...currentTimes, value] }));
    } else {
      setEditData(prev => ({
        ...prev,
        times: currentTimes.filter((time) => time !== value)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLocalStorage) {
      // Update in localStorage
      try {
        const storedMedications = JSON.parse(localStorage.getItem('medications')) || [];
        const updatedMedications = storedMedications.map(med => {
          if (med.id === medication.id) {
            return {
              ...med,
              name: editData.medication,
              dose: editData.dosage,
              startDate: editData.startDate,
              duration: editData.duration,
              times: editData.times
            };
          }
          return med;
        });
        
        localStorage.setItem('medications', JSON.stringify(updatedMedications));
        toast.success('Medication updated successfully!');
        onUpdate();
        onClose();
      } catch (error) {
        console.error('Error updating medication in localStorage:', error);
        toast.error('Failed to update medication');
      }
    } else {
      // Update in server
      try {
        const response = await axios.put(
          `https://thyverse-backend.vercel.app/server/dashuser/update-medi/${medication._id}`,
          {
            medication: editData.medication,
            dosage: editData.dosage,
            startDate: editData.startDate,
            duration: editData.duration,
            times: editData.times
          }
        );

        if (response.data.success) {
          toast.success('Medication updated successfully!');
          onUpdate();
          onClose();
        } else {
          toast.error('Failed to update medication');
        }
      } catch (error) {
        toast.error('Error updating medication');
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (medication) {
      setEditData({
        medication: medication.medication_name || medication.name,
        dosage: medication.medication_dosage || medication.dose,
        startDate: medication.medication_date ? medication.medication_date.split('T')[0] : medication.startDate,
        duration: medication.medication_duration || medication.duration,
        times: medication.medication_schedule || medication.times || []
      });
    }
  }, [medication]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#000042] rounded-xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-white">Edit Medication</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-1">Medication Name</label>
            <input
              type="text"
              name="medication"
              value={editData.medication}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-orange-400 bg-[#000042] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter medication name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-1">Dosage</label>
              <input
                type="text"
                name="dosage"
                value={editData.dosage}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-orange-400 bg-[#000042] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter dosage (mg)"
              />
            </div>
            <div>
              <p className="text-white mb-2">Select Medication Times:</p>
              <div className="flex space-x-4">
                {['Morning', 'Afternoon', 'Night'].map(time => (
                  <label key={time} className="text-white">
                    <input
                      type="checkbox"
                      name="times"
                      value={time}
                      checked={editData.times.includes(time)}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    {time}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={editData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-orange-400 bg-[#000042] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Duration (days)</label>
              <input
                type="number"
                name="duration"
                value={editData.duration}
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
            Update Medication
          </button>
        </form>
      </div>
    </div>
  );
};

const MedicationList = ({ fetchMediForGraph, medicationData, fetchMedications }) => {
  const { currentUser } = useAuth();
  const [medications, setMedications] = useState([]);
  const [localStorageMedications, setLocalStorageMedications] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLocalStorageMed, setIsLocalStorageMed] = useState(false);

  const openDeleteModal = (medication, isLocalStorage = false) => {
    setSelectedMedication(medication);
    setIsLocalStorageMed(isLocalStorage);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (medication, isLocalStorage = false) => {
    setSelectedMedication(medication);
    setIsLocalStorageMed(isLocalStorage);
    setIsModalOpen(true);
  };

  const handleDelete = async (medication) => {
    if (isLocalStorageMed) {
      // Delete from localStorage
      try {
        const storedMedications = JSON.parse(localStorage.getItem('medications')) || [];
        const updatedMedications = storedMedications.filter(med => med.id !== medication.id);
        localStorage.setItem('medications', JSON.stringify(updatedMedications));
        setLocalStorageMedications(updatedMedications);
        toast.success('Medication deleted successfully!');
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error('Error deleting medication from localStorage:', error);
        toast.error('Failed to delete medication');
      }
    } else {
      // Delete from server
      try {
        const response = await axios.delete(
          `https://thyverse-backend.vercel.app/server/dashuser/delete-medi/${medication._id}`
        );

        if (response.data.success) {
          toast.success('Medication deleted successfully!');
          if (fetchMedications) {
            fetchMedications();
          }
          setIsDeleteModalOpen(false);
        } else {
          toast.error('Failed to delete medication');
        }
      } catch (error) {
        toast.error('Error deleting medication');
        console.error(error);
      }
    }
  };

  useEffect(() => {
    // Load medications from props
    if (medicationData) {
      setMedications(medicationData);
    }
    
    // Load medications from localStorage
    try {
      const storedMedications = JSON.parse(localStorage.getItem('medications')) || [];
      setLocalStorageMedications(storedMedications);
    } catch (error) {
      console.error('Error loading medications from localStorage:', error);
    }
  }, [medicationData]);

  // Combine server and localStorage medications
  const allMedications = [...medications, ...localStorageMedications];

  return (
    <div className="bg-[#000042]/80 rounded-xl p-6 shadow-lg mt-8">
      <h3 className="text-xl font-semibold mb-4 text-white">Medication List</h3>
      <div>
        {allMedications.length === 0 ? (
          <p className="text-white text-center">No medications added yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-orange-400">
                  <th className="py-2 text-left">Medication</th>
                  <th className="py-2 text-left">Dosage</th>
                  <th className="py-2 text-left">Schedule</th>
                  <th className="py-2 text-left">Duration</th>
                  <th className="py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allMedications.map((med) => {
                  // Check if this is a localStorage medication
                  const isLocalStorage = !med._id;
                  const medName = med.medication_name || med.name;
                  const medDosage = med.medication_dosage || med.dose;
                  const medSchedule = med.medication_schedule || med.times || [];
                  const medDuration = med.medication_duration || med.duration;
                  const medId = med._id || med.id;
                  
                  return (
                    <tr key={medId} className="border-b border-gray-700 hover:bg-[#000042]/50">
                      <td className="py-3">{medName}</td>
                      <td className="py-3">{medDosage} mg</td>
                      <td className="py-3">{medSchedule.join(', ')}</td>
                      <td className="py-3">{medDuration} days</td>
                      <td className="py-3 flex justify-center space-x-4">
                        <button
                          onClick={() => handleEdit(med, isLocalStorage)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Pencil size={20} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(med, isLocalStorage)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {selectedMedication && (
        <EditMedicationModal
          medication={selectedMedication}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={fetchMedications}
          isLocalStorage={isLocalStorageMed}
        />
      )}

      {/* Delete Modal */}
      {selectedMedication && (
        <DeleteModalMedication
          medication={selectedMedication}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default MedicationList;