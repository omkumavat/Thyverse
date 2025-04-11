import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../Context/AuthProvider';

const DeleteModalMedication = ({
  isOpen,
  onClose,
  medication,
  onConfirm
}) => {
  const { currentUser } = useAuth();
  const [confirmText, setConfirmText] = useState('');
  const [medName, setMedName] = useState('');

  useEffect(() => {
    if (medication) {
      // Get the medication name from either server or localStorage format
      const name = medication.medication_name || medication.name || '';
      setMedName(name);
    }
  }, [medication]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (confirmText === (medName + ' remove')) {
      // Call the onConfirm function passed from parent
      onConfirm(medication);
      setConfirmText('');
    } else {
      toast.error('Please confirm deletion with the correct text');
    }
  };

  if (!isOpen) return null;

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
            Are you sure you want to remove <span className="font-semibold">{medName} Medication</span>? This action cannot be undone.
          </p>
          <p className="text-sm text-gray-500">
            Type <span className="font-mono font-semibold text-red-400">{medName} remove</span> to confirm
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={`Type "${medName} remove" to confirm`}
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
              disabled={confirmText !== `${medName} remove`}
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