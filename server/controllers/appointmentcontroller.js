const mongoose = require("mongoose");
const AppointmentModel = require("../models/appointment");
const User = require("../models/customer");
const addAppointment = async(req, res) => {
    const userId = req.id; // Assuming req.id contains the authenticated user's ID

    try {
        // Check if the userId is valid
        if (!userId) {
            return res.status(400).json({ message: "UserId is required." });
        }

        const { Date: appointmentDate, Time: appointmentTime } = req.body; // No need to extract UserId from body
        const dateObj = new Date(appointmentDate);
        const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;

        // Convert time to 12-hour format
        const timeObj = new Date(`1970-01-01T${appointmentTime}:00`);
        let hours = timeObj.getHours();
        const minutes = timeObj.getMinutes().toString().padStart(2, "0");
        const period = hours >= 12 ? "P.M." : "A.M.";
        hours = hours % 12 || 12;
        const formattedTime = `${hours}.${minutes} ${period}`;
        const existingAppointment = await AppointmentModel.findOne({
            Doctorname: req.body.Doctorname,
            Date: formattedDate,
            Time: formattedTime,
        });

        if (existingAppointment) {
            return res.status(400).json({
                message: "Appointment already exists",
                existingData: existingAppointment,
            });
        }

        // Create a new appointment with UserId from authentication
        const newAppointment = {
            ...req.body,
            Date: formattedDate,
            Time: formattedTime,
            UserId: userId,
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

const getAllAppointments = async(req, res) => {
    const { id } = req.params;
    try {
        const appointments = await AppointmentModel.find({});
        if (!appointments) {
            return res.status(404).json({ message: "Appointment not found!" });
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
        const appointment = await AppointmentModel.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found!" });
        }
        res.status(200).json({
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
        const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
            id,
            updateData, { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: "No Appointment exists!" });
        }

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
};