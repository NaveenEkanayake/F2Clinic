import express from "express";
import {
  addInventory,
  getInventory,
  updateInventory,
  deleteInventoryItem,
} from "../controller/inventory_controller.js";

const router = express.Router();

router.post("/api/inventory", async (req, res) => {
  try {
    await addInventory(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/api/inventory", getInventory);
router.delete("/api/inventory/:id", deleteInventoryItem);
router.put("/api/inventory/:id", updateInventory);

export default router;
