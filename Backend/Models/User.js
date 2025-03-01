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
        type: [{
            value: { type: Number, default: 0 },
            date: { type: Date, default: Date.now() }
        }],
        default: []
    },
    bodyfat: {
        type: [{
            value: { type: Number, default: 0 },
            date: { type: Date, default: Date.now() }
        }],
        default: []
    },
    age: {
        type: Number,
        default: 0
    },
    bmi: {
        type: [{
            value: { type: Number, default: 0 },
            date: { type: Date, default: Date.now() }
        }],
        default: []
    },
    bmr: {
        type: [{
            value: { type: Number, default: 0 },
            date: { type: Date, default: Date.now() }
        }],
        default: []
    },
    Systolic: {
        type: [{
            value: { type: Number, default: 0 },
            date: { type: Date, default: Date.now() }
        }],
        default: []
    },
    Diastolic: {
        type: [{
            value: { type: Number, default: 0 },
            date: { type: Date, default: Date.now() }
        }],
        default: []
    },
    pulserate: {
        type: [{
            value: { type: Number, default: 0 },
            date: { type: Date, default: Date.now() }
        }],
        default: []
    },
    medications_ids: {
        type: [mongoose.Schema.ObjectId],
        default: []
    }

}, { timestamps: true });

export default mongoose.model('User', userSchema);
