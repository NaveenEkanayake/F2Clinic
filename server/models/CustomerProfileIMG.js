const mongoose = require("mongoose");
const { type } = require("os");

const userImageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    IMGurl: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const UserImage = mongoose.model("CutomerProfileImage", userImageSchema);

module.exports = UserImage;