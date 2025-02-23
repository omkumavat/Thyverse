import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    profilePicture: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
    },

    height: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number,
        default: 0
    },
    bodyfat: {
        type: Number,
        default: 0
    },
    bmi: {
        type: Number,
        default: 0
    },
    Systolic: {
        type: [Number],
        default: []
    },
    Diastolic: {
        type: [Number],
        default: []
    },
    pulserate: {
        type: Number,
        default: 0,
    },
    medications_ids:{
        type:[mongoose.Schema.ObjectId],
        default:[]
    }

}, { timestamps: true });

export default mongoose.model('User', userSchema);
