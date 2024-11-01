const mongoose = require("mongoose");
const AppointmentModel = require("../models/appointment");
const User = require("../models/customer");
const Consultant = require("../models/consultant");
const {
    getAllConsultantNames,
} = require("../controllers/consultantcontroller");

const addAppointment = async(req, res) => {
    const userId = req.id;

    try {
        if (!userId) {
            return res.status(400).json({ message: "UserId is required." });
        }
        const {
            Date: appointmentDate,
            Time: appointmentTime,
            SpecialConcern,
            OwnerName,
            OwnerEmail,
            Doctorname,
            AppointmentPrice,
        } = req.body;

        if (AppointmentPrice === undefined || AppointmentPrice === null) {
            return res.status(400).json({ message: "AppointmentPrice is required." });
        }

        const cleanedDoctorname = Doctorname.replace(/Dr\.?/i, "").trim();
        const [firstname, lastname] = cleanedDoctorname.split(" ");
        if (!firstname || !lastname) {
            return res.status(400).json({ message: "Invalid doctor name format." });
        }

        const allConsultantsResponse = await getAllConsultantNames(req);
        const consultantNames = allConsultantsResponse.consultants;
        const formattedDoctorName = `Dr. ${firstname} ${lastname}`;

        if (!consultantNames.includes(formattedDoctorName)) {
            return res
                .status(404)
                .json({ message: `Consultant ${Doctorname} not found.` });
        }

        const dateObj = new Date(appointmentDate);
        const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;

        const timeObj = new Date(`1970-01-01T${appointmentTime}:00`);
        let hours = timeObj.getHours();
        const minutes = timeObj.getMinutes().toString().padStart(2, "0");
        const period = hours >= 12 ? "P.M." : "A.M.";
        hours = hours % 12 || 12;
        const formattedTime = `${hours}.${minutes} ${period}`;

        const existingAppointment = await AppointmentModel.findOne({
            Doctorname: formattedDoctorName,
            Date: formattedDate,
            Time: formattedTime,
        });

        if (existingAppointment) {
            return res.status(400).json({
                message: "Appointment already exists for this consultant.",
                existingData: existingAppointment,
            });
        }

        const latestAppointment = await AppointmentModel.findOne({
            UserId: userId,
        }).sort({ createdAt: -1 });

        let newCount = 1;
        if (latestAppointment) {
            newCount = latestAppointment.Count + 1;
        }

        const newAppointment = {
            Doctorname: formattedDoctorName,
            Date: formattedDate,
            Time: formattedTime,
            SpecialConcern,
            OwnerName,
            OwnerEmail,
            UserId: userId,
            Status: false,
            Count: newCount,
            AppointmentPrice,
        };

        const appointment = await AppointmentModel.create(newAppointment);

        return res.status(201).json({
            message: "Appointment Created Successfully!!!",
            addedData: appointment,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

const countUserAppointments = async(req, res) => {
    const userId = req.params.id;

    try {
        if (!userId) {
            return res.status(400).json({ message: "UserId is required." });
        }
        const appointmentCount = await AppointmentModel.countDocuments({
            UserId: userId,
        });
        return res.status(200).json({
            message: "Appointment count retrieved successfully",
            appointmentCount,
        });
    } catch (err) {
        console.error(`Error counting appointments for userId ${userId}:`, err);
        return res.status(500).json({ message: `Server Error: ${err.message}` });
    }
};
const getAllConsultantAppointments = async(req, res) => {
    try {
        const fullName = req.fullname;
        if (!fullName) {
            return res.status(400).json({ message: "Full name is required." });
        }

        // Strip "Dr." prefix from the fullName
        const strippedFullName = fullName.replace(/^Dr\.\s*/i, "").trim();

        console.log("Consultant Full Name:", fullName);
        console.log("Stripped Full Name:", strippedFullName);

        // Query the appointments where Doctorname matches the stripped full name
        const appointments = await AppointmentModel.find({
            Doctorname: { $regex: new RegExp(`^Dr\\.\\s*${strippedFullName}$`, "i") },
        });

        // Debugging: log retrieved appointments
        console.log("Retrieved Appointments:", appointments);

        if (appointments.length === 0) {
            return res
                .status(404)
                .json({ message: "No appointments found for this consultant." });
        }

        return res.status(200).json(appointments);
    } catch (error) {
        console.error("Error retrieving appointments:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

const getAllAppointments = async(req, res) => {
    const userId = req.id;

    try {
        const appointments = await AppointmentModel.find({ UserId: userId });

        if (!appointments || appointments.length === 0) {
            return res
                .status(404)
                .json({ message: "No appointments found for this user!" });
        }

        res.status(200).json({
            message: "Appointments retrieved successfully",
            retrievedData: appointments,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getAppointmentById = async(req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ message: "Invalid appointment ID." });
        }
        const appointment = await AppointmentModel.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found!" });
        }
        return res.status(200).json({
            message: "Appointment retrieved successfully",
            retrievedData: appointment,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
const updateAppointment = async(req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const existingAppointment = await AppointmentModel.findById(id);
        if (!existingAppointment) {
            return res.status(404).json({ message: "No Appointment exists!" });
        }
        if (updateData.Doctorname) {
            const [firstname, lastname] = updateData.Doctorname.replace(
                    /^Dr\.\s*/,
                    ""
                )
                .split(" ")
                .map((name) => name.trim());

            const consultant = await Consultant.findOne({
                firstname: new RegExp(`^${firstname}$`, "i"),
                lastname: new RegExp(`^${lastname}$`, "i"),
            });

            if (!consultant) {
                return res.status(404).json({
                    message: `Consultant ${updateData.Doctorname} not found. Please ensure the names are correct.`,
                });
            }
        }
        const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
            id,
            updateData, { new: true }
        );

        res.status(200).json({
            message: "Appointment updated successfully!",
            updatedData: updatedAppointment,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const deleteAppointment = async(req, res) => {
    const { id } = req.params;
    try {
        const deletedAppointment = await AppointmentModel.findByIdAndDelete(id);
        if (!deletedAppointment) {
            return res.status(404).json({ message: "Appointment not found!" });
        }
        res.status(200).json({
            message: "Appointment deleted successfully!",
            deletedData: deletedAppointment,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const countAppointmentPrices = async(req, res) => {
    try {
        const userId = req.id;

        if (!userId) {
            return res.status(400).json({ message: "User ID not provided." });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);

        const appointments = await AppointmentModel.find({ UserId: userObjectId });
        console.log("User appointments:", appointments);

        const result = await AppointmentModel.aggregate([{
                $match: {
                    UserId: userObjectId,
                },
            },
            {
                $group: {
                    _id: null,
                    totalAppointmentPrice: { $sum: "$AppointmentPrice" },
                },
            },
        ]);

        const total = result.length > 0 ? result[0].totalAppointmentPrice : 0;

        console.log("Aggregation result:", result);

        return res.status(200).json({
            message: "Total Appointment Prices calculated successfully",
            totalAppointmentPrice: total,
        });
    } catch (error) {
        console.error("Error in calculating total appointment prices:", error);
        return res.status(500).json({
            message: "An error occurred while calculating total appointment prices.",
        });
    }
};
module.exports = {
    addAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    countUserAppointments,
    countAppointmentPrices,
    getAllConsultantAppointments,
};