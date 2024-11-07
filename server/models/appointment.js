const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    Doctorname: {
        type: [String],
        required: true,
    },
    Date: {
        type: String,
        required: true,
    },
    Time: {
        type: String,
        required: true,
    },
    SpecialConcern: {
        type: String,
        required: true,
    },
    OwnerName: {
        type: String,
        required: true,
    },
    OwnerEmail: {
        type: String,
        required: true,
    },
    Status: {
        type: Boolean,
        default: false,
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    AppointmentPrice: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;