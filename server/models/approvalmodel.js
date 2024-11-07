const mongoose = require("mongoose");

const ApprovalModelSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },

    Status: {
        type: String,
        default: false,
    },
});

const ApprovalModel = mongoose.model("ApprovalModel", ApprovalModelSchema);

module.exports = ApprovalModel;