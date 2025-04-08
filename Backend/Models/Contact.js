import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: Number,
        trim: true,
    },
    help: {
        type: String,
        required: [true, "Help field is required."],
        trim: true,
    },
    message: {
        type: String,
        required: [true, "Message is required."],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Contact", ContactSchema);
