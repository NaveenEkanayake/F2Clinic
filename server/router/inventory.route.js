const express = require("express");
const {
  addInventoryItem,
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventorycontroller");
const { verifyAdminToken } = require("../controllers/Admincontroller");

const router = express.Router();

router.post("/addInventory", verifyAdminToken, addInventoryItem);
router.get("/getAllInventory", verifyAdminToken, getAllInventory);
router.get("/getInventoryByID/:id", verifyAdminToken, getInventoryById);
router.put("/updateInventory/:id", verifyAdminToken, updateInventory);
router.delete("/deleteInventory/:id", verifyAdminToken, deleteInventory);

module.exports = router;
