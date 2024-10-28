const mongoose = require("mongoose");
const AppointmentModel = require("../models/appointment");
const User = require("../models/customer");
const Consultant = require("../models/consultant");
const {
    getAllConsultantnames,
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
            OwnerName,
            Email,
            Doctorname,
        } = req.body;
        const cleanedDoctorname = Doctorname.replace(/Dr\.?/i, "").trim();
        const [firstname, lastname] = cleanedDoctorname.split(" ");
        if (!firstname || !lastname) {
            return res.status(400).json({ message: "Invalid doctor name format." });
        }
        const allConsultantsResponse = await getAllConsultantnames(req);
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
            OwnerName,
            Email,
            UserId: userId,
            Status: false,
            Count: newCount,
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
module.exports = {
    addAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    countUserAppointments,
};