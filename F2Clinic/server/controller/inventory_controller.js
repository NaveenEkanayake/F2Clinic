import Inventory from "../models/Addinventory.js";

const addInventory = async (req, res) => {
  console.log(req.body);
  try {
    const { itemName, Category, Quantity, Description, imagePath } = req.body;

    const newInventory = new Inventory({
      itemName,
      Category,
      Quantity,
      Description,
      imagePath,
    });

    await newInventory.save();
    console.log("Inventory item added successfully:", newInventory);

    res.status(201).json({
      message: "Inventory item added successfully",
      inventoryItem: newInventory,
    });
  } catch (error) {
    console.error("Error adding inventory:", error);
    res.status(500).json({ error: "Error adding inventory" });
  }
};

const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json({ inventory });
  } catch (error) {
    console.error("Error getting inventory:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteInventoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInventory = await Inventory.findByIdAndDelete(id);
    if (!deletedInventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    res.status(200).json({
      message: "Inventory item deleted successfully",
      deletedInventory: deletedInventory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addInventory, getInventory, deleteInventoryById };
