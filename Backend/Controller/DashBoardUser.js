import User from "../Models/User.js";
import Medication from "../Models/Medication.js";
import cron, { schedule } from 'node-cron';

export const addMedication = async (req, res) => {
    try {
        const { id } = req.params; // user id from route params
        console.log(req.body);
        const { medication, dosage, times, startDate, duration } = req.body;

        // Validate required fields
        if (!id || !medication || dosage == null || times === null || !startDate || duration == null) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Validate numeric fields: dosage, frequency, duration should be positive numbers.
        if (isNaN(Number(dosage)) || Number(dosage) <= 0) {
            return res.status(400).json({ error: "Invalid dosage value" });
        }

        if (isNaN(Number(duration)) || Number(duration) <= 0) {
            return res.status(400).json({ error: "Invalid duration value" });
        }

        // Validate that the user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Create and save the new medication
        const newMedication = new Medication({
            userId: id,
            medication_schedule: times,
            medication_name: medication,
            medication_dosage: Number(dosage),
            medication_date: startDate,
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

export const updateMedication = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body);

        // Validate that the user exists
        const medi = await Medication.findById(id);
        if (!medi) {
            return res.status(404).json({ error: "medication not found" });
        }

        const { medication, dosage, times, startDate, duration } = req.body;

        // Validate required fields
        if (!id || !medication || dosage == null || times === null || !startDate || duration == null) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Validate numeric fields: dosage, frequency, duration should be positive numbers.
        if (isNaN(Number(dosage)) || Number(dosage) <= 0) {
            return res.status(400).json({ error: "Invalid dosage value" });
        }

        if (isNaN(Number(duration)) || Number(duration) <= 0) {
            return res.status(400).json({ error: "Invalid duration value" });
        }

        medi.medication_schedule = times;
        medi.medication_name = medication;
        medi.medication_dosage = Number(dosage);
        medi.medication_date = startDate;
        medi.medication_duration = Number(duration);

        await medi.save();

        return res.status(201).json({
            success: true,
            message: "Medication added successfully",
            medication: medi,
        });
    } catch (error) {
        console.error("Error in addMedication controller:", error);
        return res.status(500).json({ error: "Server error" });
    }
}


export const deleteMedication = async (req, res) => {
  try {
    const { userId, mediId } = req.params;

    // Find the medication and ensure it belongs to the user
    const medication = await Medication.findOne({ _id: mediId, userId });
    if (!medication) {
      return res.status(404).json({
        success: false,
        message: 'Medication not found or does not belong to the user'
      });
    }

    // Delete the medication from the Medication collection
    await Medication.findByIdAndDelete(mediId);

    // Remove the medication id from the user's medications_ids array
    await User.findByIdAndUpdate(userId, { $pull: { medications_ids: mediId } });

    res.status(200).json({
      success: true,
      message: 'Medication deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting medication:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting medication'
    });
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
            medications
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

        if (pulse !== undefined) {
            if (user.pulserate.length < 5) {
                user.pulserate.push({ value: parseInt(pulse) })
            } else {
                user.pulserate.shift();
                user.pulserate.push({ value: parseInt(pulse) });
            }
        }

        if (systolic !== undefined) {
            if (user.Systolic.length < 5) {
                user.Systolic.push({ value: parseInt(systolic) })
            } else {
                user.Systolic.shift();
                user.Systolic.push({ value: parseInt(systolic) });
            }
        }

        if (diastolic !== undefined) {
            if (user.Diastolic.length < 5) {
                user.Diastolic.push({ value: parseInt(diastolic) })
            } else {
                user.Diastolic.shift();
                user.Diastolic.push({ value: parseInt(diastolic) });
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

// helpers/dateHelper.js
export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};


export const getVitals = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const formatMeasurementArray = (measurements) => {
            if (!measurements || measurements.length === 0) {
                return [];
            }

            return measurements.map((measurement) => ({
                value: measurement.value,
                date: formatDate(measurement.date), // Format the date
            }));
        };

        return res.status(201).json({
            success: true,
            message: "Vitals get successfully",
            diastolic: formatMeasurementArray(user.Diastolic),
            systolic: formatMeasurementArray(user.Systolic),
            pulse: formatMeasurementArray(user.pulserate)
        });
    } catch (error) {
        console.error("Error deleting expired medications:", error);
    }
}

export const addBodyMeasurements = async (req, res) => {
    try {

        const { userId } = req.params;
        const { weight, height, bmi, bmr, bodyFat, age } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (weight !== undefined)
            if (user.weight.length < 7) {
                user.weight.push({ value: parseFloat(weight) })
            } else {
                user.weight.shift();
                user.weight.push({ value: parseFloat(weight) });
            }

        if (height !== undefined) user.height = parseFloat(height);
        if (age !== undefined) user.age = parseFloat(age);

        if (bmi !== undefined) {
            if (user.bmi.length < 7) {
                user.bmi.push({ value: parseFloat(bmi) })
            } else {
                user.bmi.shift();
                user.bmi.push({ value: parseFloat(bmi) });
            }
        }
        if (bodyFat !== undefined) {
            if (user.bodyfat.length < 7) {
                user.bodyfat.push({ value: parseFloat(bodyFat) })
            } else {
                user.bodyfat.shift();
                user.bodyfat.push({ value: parseFloat(bodyFat) });
            }
        }

        if (bmr !== undefined) {
            if (user.bmr.length < 7) {
                user.bmr.push({ value: parseFloat(bmr) })
            } else {
                user.bmr.shift();
                user.bmr.push({ value: parseFloat(bmr) });
            }
        }

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
            return res.status(404).json({ error: 'User not found' });
        }

        const formatMeasurementArray = (measurements) => {
            if (!measurements || measurements.length === 0) {
                return [];
            }

            return measurements.map((measurement) => ({
                value: measurement.value,
                date: formatDate(measurement.date), // Format the date
            }));
        };

        return res.status(201).json({
            age: user.age,
            success: true,
            message: 'BodyMeasures get successfully',
            weight: formatMeasurementArray(user.weight),
            height: user.height,
            bmi: formatMeasurementArray(user.bmi),
            bmr: formatMeasurementArray(user.bmr),
            bodyfat: formatMeasurementArray(user.bodyfat),
            // Systolic: formatMeasurementArray(user.Systolic),
            // Diastolic: formatMeasurementArray(user.Diastolic),
            // pulserate: formatMeasurementArray(user.pulserate),
        });
    } catch (error) {
        console.error('Error getting body measurements:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};