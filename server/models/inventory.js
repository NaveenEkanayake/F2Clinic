const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
    ItemName: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    Quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    imagepath: {
        type: String,
        required: false,
    },
    Description: {
        type: String,
        required: false,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    count: {
        type: Number,
        default: 0,
    },
});

const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports = Inventory;