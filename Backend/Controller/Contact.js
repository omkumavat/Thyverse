import Contact from "../Models/Contact.js";

export const submitContact = async (req, res) => {
    try {
        const { fullName, email, phone, help, message, terms } = req.body;

        if (!fullName || !email || !phone || !help || !message || typeof terms !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "All fields are required and terms must be accepted.",
            });
        }

        // Create a new contact document
        const contactSubmission = new Contact({
            fullName,
            email,
            phone,
            help,
            message,
        });

        await contactSubmission.save();

        res.status(201).json({
            success: true,
            message: "Form submitted successfully!",
        });
    } catch (error) {
        console.error("Error submitting contact form: ", error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
            error: error.message,
        });
    }
};
