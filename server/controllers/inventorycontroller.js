const InventoryModel = require("../models/inventory");
const AdminModel = require("../models/admin");

const addInventoryItem = async(req, res) => {
    const { ItemName, Category, Quantity, imagepath, Description } = req.body;
    const adminId = req.id;

    try {
        const admin = await AdminModel.findById(adminId);
        if (!admin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
        const existingItemsCount = await InventoryModel.countDocuments({
            ItemName,
            adminId,
        });

        let existingItem = await InventoryModel.findOne({
            ItemName,
            Category,
            adminId,
        });

        if (existingItem) {
            existingItem.count += 1;
            await existingItem.save();
            return res.status(200).json({
                item: existingItem,
            });
        }

        const newItem = new InventoryModel({
            ItemName,
            Category,
            Quantity,
            imagepath,
            Description,
            adminId,
            count: existingItemsCount + 1,
        });

        await newItem.save();
        return res
            .status(201)
            .json({ message: "Inventory item added successfully!", newItem });
    } catch (err) {
        console.error("Add Inventory Item error:", err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllInventory = async(req, res) => {
    try {
        const admin = await AdminModel.findById(req.id);
        if (!admin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const allInventory = await InventoryModel.find({});
        if (allInventory.length === 0) {
            return res.status(400).json({ message: "No Inventory Items found!" });
        }

        res.status(200).json({
            message: "Inventory Items Retrieved Successfully!",
            retrieveditems: allInventory,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getInventoryCount = async(req, res) => {
    const adminId = req.id;

    try {
        const items = await InventoryModel.find({ adminId });

        if (items.length === 0) {
            return res
                .status(404)
                .json({ message: "No inventory added for this admin." });
        }

        const totalCount = items.reduce((acc, item) => acc + item.count, 0);

        return res.status(200).json({
            message: "Total count retrieved successfully",
            totalCount,
        });
    } catch (err) {
        console.error("Get Item Count error:", err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getInventoryById = async(req, res) => {
    const { id } = req.params;

    try {
        const admin = await AdminModel.findById(req.id);
        if (!admin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const inventory = await InventoryModel.findById(id);
        if (!inventory) {
            return res.status(404).json({ message: "No Inventory items exists!" });
        }

        res.status(200).json({
            message: "Inventory items retrieved successfully!",
            retrievedData: inventory,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateInventory = async(req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    delete updateData.imagepath;

    try {
        const admin = await AdminModel.findById(req.id);
        if (!admin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const updatedInventory = await InventoryModel.findByIdAndUpdate(
            id,
            updateData, { new: true }
        );

        if (!updatedInventory) {
            return res.status(404).json({ message: "No Inventory items exist!" });
        }

        res.status(200).json({
            message: "Inventory updated successfully!",
            updatedData: updatedInventory,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteInventory = async(req, res) => {
    const { id } = req.params;

    try {
        const admin = await AdminModel.findById(req.id);
        if (!admin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const deletedInventory = await InventoryModel.findByIdAndDelete(id);
        if (!deletedInventory) {
            return res.status(404).json({ message: "Inventory not found!" });
        }

        res.status(200).json({
            message: "Inventory deleted successfully!",
            deletedData: deletedInventory,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addInventoryItem,
    getAllInventory,
    getInventoryById,
    updateInventory,
    deleteInventory,
    getInventoryCount,
};