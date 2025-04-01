import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../Context/AuthProvider';

const DeleteModalMedication = ({
  isDeleteOpen,
  onClose,
  medication,
  onUpdate,
  onUpdate2
}) => {
  const { currentUser } = useAuth();
  const [confirmText, setConfirmText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmText.toLowerCase() === (medication.medication_name + ' remove')) {
      try {
        const response = await axios.delete(`https://thyverse-backend.vercel.app/server/dashuser/delete-medi/${currentUser._id}/${medication._id}`);
        console.log(response.data.success);
        onUpdate();
        onUpdate2();
        toast.success("Medication removed successfuly")
      } catch (error) {
        toast.error("Failed to removed Medication successfuly")
      }
      setConfirmText('');
      onClose();
    } else {
      setToast({ success: false, message: 'Please confirm deletion' });
    }
  };



  useEffect(() => {
    if (medication) {
      // setEditData({
      //   medication: medication.medication_name,
      //   dosage: medication.medication_dosage,
      //   startDate: medication.medication_date ? medication.medication_date.split('T')[0] : '',
      //   duration: medication.medication_duration,
      //   times: medication.medication_schedule || []
      // });
    }
  }, [medication]);
  if (!isDeleteOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Remove Medication</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Are you sure you want to remove <span className="font-semibold">{medication.medication_name} Medication</span>? This action cannot be undone.
          </p>
          <p className="text-sm text-gray-500">
            Type <span className="font-mono font-semibold text-red-400">{medication.medication_name} remove</span> to confirm
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type 'delete' to confirm"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          />

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={confirmText.toLowerCase() !== `${medication.medication_name} remove`}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Remove
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteModalMedication;