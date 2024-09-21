// routes/admin.js
import express from "express";
import { addAdmin, authenticateAdmin } from "../controller/Adminlogin.js";

const router = express.Router();

router.post("/adminadd", async (req, res) => {
  try {
    await addAdmin(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/adminlogin", async (req, res) => {
  try {
    const { UserName, Password } = req.body;
    const authResult = await authenticateAdmin(UserName, Password);

    if (!authResult.success) {
      return res.status(401).json({ message: authResult.message });
    }

    res.status(200).json({ message: authResult.message });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
