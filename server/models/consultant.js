const mongoose = require("mongoose");

const Consultantschema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    speciality: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    telephoneNumber: {
        type: String,
        maxLength: 10,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
});

const consultant = mongoose.model("Consultant", Consultantschema);
module.exports = consultant;