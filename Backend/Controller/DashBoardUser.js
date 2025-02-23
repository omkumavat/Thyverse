import User from "../Models/User.js";
import Medication from "../Models/Medication.js";
import cron from 'node-cron';

export const addMedication = async (req, res) => {
    try {
        const { id } = req.params; // user id from route params
        console.log(req.body);
        const { medication, dosage, frequency, startDate, duration } = req.body;

        // Validate required fields
        if (!id || !medication || dosage == null || frequency == null || !startDate || duration == null) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Validate numeric fields: dosage, frequency, duration should be positive numbers.
        if (isNaN(Number(dosage)) || Number(dosage) <= 0) {
            return res.status(400).json({ error: "Invalid dosage value" });
        }
        if (isNaN(Number(frequency)) || Number(frequency) <= 0) {
            return res.status(400).json({ error: "Invalid frequency value" });
        }
        if (isNaN(Number(duration)) || Number(duration) <= 0) {
            return res.status(400).json({ error: "Invalid duration value" });
        }

        // Convert startDate to a timestamp and validate
        const medicationDateObj = new Date(startDate);
        if (isNaN(medicationDateObj.getTime())) {
            return res.status(400).json({ error: "Invalid start date" });
        }
        const medicationDate = medicationDateObj.getTime();

        // Validate that the user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Create and save the new medication
        const newMedication = new Medication({
            userId: id,
            medication_name: medication,
            medication_dosage: Number(dosage),
            medication_frequency: Number(frequency),
            medication_date: medicationDate,
            medication_duration: Number(duration),
        });
        const savedMedication = await newMedication.save();

        // Update user's medications_ids array
        user.medications_ids.push(savedMedication._id);
        await user.save();

        return res.status(201).json({
            success: true,
            message: "Medication added successfully",
            medication: savedMedication,
        });
    } catch (error) {
        console.error("Error in addMedication controller:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

export const getMediForGraph = async (req, res) => {
    try {
        // Optionally, filter by user if needed:
        const { userId } = req.params;
        console.log(userId);

        const medications = await Medication.find({ userId });

        // Extract medication names and dosages arrays.
        const medicationNames = medications.map(med => med.medication_name);
        const medicationDosages = medications.map(med => med.medication_dosage);

        return res.status(200).json({
            names: medicationNames,
            dosages: medicationDosages,
        });
    } catch (error) {
        console.error('Error fetching dosage comparison data:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

cron.schedule('0 0 * * *', async () => {
    const now = Date.now();
    try {
        const expiredMedications = await Medication.find({
            $expr: {
                $lte: [
                    { $add: ["$medication_date", { $multiply: ["$medication_duration", 86400000] }] },
                    now
                ]
            }
        });

        for (const med of expiredMedications) {
            // Remove the medication id from the associated user's medications_ids array.
            await User.findByIdAndUpdate(med.userId, {
                $pull: { medications_ids: med._id }
            });
            // Delete the medication document.
            await Medication.findByIdAndDelete(med._id);
            console.log(`Deleted medication ${med._id} for user ${med.userId}`);
        }
    } catch (error) {
        console.error("Error deleting expired medications:", error);
    }
});


export const addVitals = async (req, res) => {
    try {
        const { userId } = req.params;
        const { systolic, diastolic, pulse } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (pulse !== undefined) user.pulserate = parseInt(pulse);
        if (systolic !== undefined) {
            if (user.Systolic.length < 5) {
                user.Systolic.push(parseInt(systolic))
            } else {
                user.Systolic.shift();
                user.Systolic.push(parseInt(systolic));
            }
        }

        if (diastolic !== undefined) {
            if (user.Diastolic.length < 5) {
                user.Diastolic.push(parseInt(diastolic))
            } else {
                user.Diastolic.shift();
                user.Diastolic.push(parseInt(diastolic));
            }
        }

        await user.save();

        return res.status(201).json({
            success: true,
            message: "Vitals added successfully",
            systolic: user.Systolic,
            diastolic: user.Diastolic,
            pulse: user.pulserate
        });
    } catch (error) {
        console.error("Error deleting expired medications:", error);
    }
}

export const getVitals = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(201).json({
            success: true,
            message: "Vitals get successfully",
            diastolic: user.Diastolic,
            systolic: user.Systolic,
            pulse: user.pulserate
        });
    } catch (error) {
        console.error("Error deleting expired medications:", error);
    }
}

export const addBodyMeasurements = async (req, res) => {
    try {

        const { userId } = req.params;
        const { weight, height, bmi, bodyFat, } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (weight !== undefined) user.weight = parseInt(weight);
        if (height !== undefined) user.height = parseInt(height);
        if (bmi !== undefined) user.bmi = parseFloat(bmi);
        if (bodyFat !== "") user.bodyfat = parseInt(bodyFat);

        await user.save();

        return res.status(201).json({
            success: true,
            message: "BodyMeasures get successfully",
            weight: user.weight,
            height: user.height,
            bmi: user.bmi,
            bodyFat: user.bodyfat
        });

    } catch (error) {
        console.error("Error deleting expired medications:", error);
    }
}

export const getBodyMeasurements = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(201).json({
            success: true,
            message: "BodyMeasures get successfully",
            weight: user.weight,
            height: user.height,
            bmi: user.bmi,
            bodyFat: user.bodyfat
        });
    } catch (error) {
        console.error("Error deleting expired medications:", error);
    }
}