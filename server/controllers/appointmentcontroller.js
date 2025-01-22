const mongoose = require("mongoose");
const AppointmentModel = require("../models/appointment");
const User = require("../models/customer");
const ConsultantModel = require("../models/consultant");
const {
  getAllConsultantNames,
} = require("../controllers/consultantcontroller");

const addAppointment = async (req, res) => {
  const userId = req.id;
  const userEmail = req.email;
  const userFullname = req.fullname;

  try {
    if (!userId) {
      return res.status(400).json({ message: "UserId is required." });
    }
    const allDoctors = (await getAllConsultantNames()) || [];
    console.log("All Doctors:", allDoctors);

    const selectedDoctorName = `Dr. ${req.body.Doctorname?.trim()}`;
    if (!selectedDoctorName) {
      return res.status(400).json({ message: "Doctor name is required." });
    }

    const normalizedDoctors = allDoctors.map((name) =>
      name.trim().toLowerCase()
    );
    if (!normalizedDoctors.includes(selectedDoctorName.toLowerCase())) {
      return res.status(400).json({ message: "Invalid doctor name selected." });
    }
    const existingAppointment = await AppointmentModel.findOne({
      Doctorname: selectedDoctorName,
      Date: req.body.Date,
      Time: req.body.Time,
    });

    if (existingAppointment) {
      return res.status(400).json({
        message:
          "An appointment with the same doctor at this time already exists.",
      });
    }

    const appointment = await AppointmentModel.create({
      Doctorname: selectedDoctorName,
      Date: req.body.Date,
      Time: req.body.Time,
      SpecialConcern: req.body.SpecialConcern,
      AppointmentPrice: req.body.AppointmentPrice,
      OwnerName: userFullname,
      OwnerEmail: userEmail,
      UserId: userId,
    });

    res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error in addAppointment:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const countUserAppointments = async (req, res) => {
  const userId = req.id;

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

const countAllAppointments = async (req, res) => {
  try {
    const appointmentCount = await AppointmentModel.countDocuments({});

    return res.status(200).json({
      message: "Total appointment count retrieved successfully",
      appointmentCount,
    });
  } catch (err) {
    console.error("Error counting appointments:", err);
    return res.status(500).json({ message: `Server Error: ${err.message}` });
  }
};

const getAllConsultantAppointments = async (req, res) => {
  try {
    const fullName = req.fullname;
    if (!fullName) {
      return res.status(400).json({ message: "Full name is required." });
    }
    const strippedFullName = fullName.replace(/^Dr\.\s*/i, "").trim();

    console.log("Consultant Full Name:", fullName);
    console.log("Stripped Full Name:", strippedFullName);
    const appointments = await AppointmentModel.find({
      Doctorname: { $regex: new RegExp(`^Dr\\.\\s*${strippedFullName}$`, "i") },
    });
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

const getAllAppointments = async (req, res) => {
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

const getAppointmentById = async (req, res) => {
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
const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const existingAppointment = await AppointmentModel.findById(id);
    if (!existingAppointment) {
      return res.status(404).json({ message: "No Appointment exists!" });
    }
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      message: "Appointment updated successfully!",
      updatedData: updatedAppointment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteAppointment = async (req, res) => {
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

const countAppointmentPrices = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID not provided." });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const appointments = await AppointmentModel.find({ UserId: userObjectId });
    console.log("User appointments:", appointments);

    const result = await AppointmentModel.aggregate([
      {
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

const getAllAppointmentPrices = async (req, res) => {
  try {
    const result = await AppointmentModel.aggregate([
      {
        $group: {
          _id: null,
          totalAppointmentPrice: { $sum: "$AppointmentPrice" },
        },
      },
    ]);
    const total = result.length > 0 ? result[0].totalAppointmentPrice : 0;

    console.log("Total Appointment Prices for all users:", result);

    return res.status(200).json({
      message: "Total appointment prices for all users calculated successfully",
      totalAppointmentPrice: total,
    });
  } catch (error) {
    console.error(
      "Error in calculating total appointment prices for all users:",
      error
    );
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
  countAllAppointments,
  getAllAppointmentPrices,
};
