const mongoose = require("mongoose");

const Adminschema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
});
const AdminLogin = mongoose.model("AdminLogin", Adminschema);
module.exports = AdminLogin;