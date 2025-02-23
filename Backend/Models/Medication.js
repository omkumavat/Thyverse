import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.ObjectId, required: true,ref:'User' },
    medication_name: { type: String, required: true },

    medication_dosage: { type: Number, required: true, },

    medication_frequency: { type: Number, required: true },

    medication_date: { type: Number, required: true },

    medication_duration: { type: Number, required: true },

}, { timestamps: true });

export default mongoose.model('Medication', medicationSchema);
