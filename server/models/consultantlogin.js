const mongoose = require("mongoose");

const consultantLoginSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "consultant",
    },
});

const Consultant = mongoose.model("ConsultantLogin", consultantLoginSchema);

module.exports = Consultant;