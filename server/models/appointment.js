const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
    Doctorname: {
        type: String,
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
    Status: {
        type: Boolean,
        default: false,
    },
    Count: {
        type: Number,
        default: 0,
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;