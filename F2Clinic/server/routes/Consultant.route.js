import express from "express";
import AddConsultant from "../models/Addconsultant.js";
import {
  addConsultant,
  getConsultant,
  deleteConsultant,
} from "../controller/Consultant.controller.js";

const router = express.Router();

router.post("/consultant", async (req, res) => {
  try {
    await addConsultant(req, res);
    const { consultants, toastMessage } = await getConsultantsRecentMessage();
    res.status(201).json({ consultants, toastMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/consultant/:id", getConsultant);
router.delete("/consultant/:id", deleteConsultant);

export default router;
