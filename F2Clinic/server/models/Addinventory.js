import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, "Please enter the itemName"],
  },
  Category: {
    type: String,
    required: [true, "Please enter the itemType"],
  },
  Quantity: {
    type: Number,
    required: [true, "Please enter the itemQuantity"],
  },
  Description: {
    type: String,
    required: [true, "Please enter the itemDescription"],
  },
  imagePath: {
    type: String,
  },
});

const Inventory = mongoose.model("Inventory", InventorySchema);

export default Inventory;
