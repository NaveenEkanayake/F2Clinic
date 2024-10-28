const mongoose = require("mongoose");
const { type } = require("os");

const AdminProfileImageSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Admin",
    },
    AdminUrl: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const AdminImage = mongoose.model("AdminProfileImage", AdminProfileImageSchema);

module.exports = AdminImage;