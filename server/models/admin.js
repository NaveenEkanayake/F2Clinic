const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
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
        required: true,
        default: "admin",
    },
});

const AdminLogin = mongoose.model("AdminLogin", AdminSchema);
module.exports = AdminLogin;