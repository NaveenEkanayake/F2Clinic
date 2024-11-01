const mongoose = require("mongoose");

const petCaresupplySchema = new mongoose.Schema({
    Supplyname: {
        type: String,
        required: true,
    },
    SupplyImg: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    SupplyDescription: {
        type: String,
        required: true,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "admin",
    },
});

const PetcareSupply = mongoose.model("PetcareSupply", petCaresupplySchema);

module.exports = PetcareSupply;