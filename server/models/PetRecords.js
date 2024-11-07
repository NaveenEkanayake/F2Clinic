const mongoose = require("mongoose");

const petrecordSchema = new mongoose.Schema({
    Petname: {
        type: String,
        required: true,
    },
    Petimage: {
        type: String,
        required: false,
    },
    Breed: {
        type: String,
        required: false,
    },
    Age: {
        type: Number,
        required: false,
    },
    Count: {
        type: Number,
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
}, {
    timestamps: true,
});

const PetRecords = mongoose.model("Pet Records", petrecordSchema);

module.exports = PetRecords;