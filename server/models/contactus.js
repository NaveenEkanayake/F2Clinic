const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});
const ContactUs = mongoose.model("ContactUs", ContactUsSchema);

module.exports = ContactUs;