import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    profilePicture: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
    },

}, { timestamps: true });

export default mongoose.model('User', userSchema);
