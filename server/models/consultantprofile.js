const mongoose = require("mongoose");

const ConsultantProfileImageSchema = new mongoose.Schema({
    ConsultantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Consultant",
    },
    ConsultantUrl: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const ConsultantProfileImage = mongoose.model(
    "ConsultantProfileImage",
    ConsultantProfileImageSchema
);
module.exports = ConsultantProfileImage;