const express = require("express");
const {
  addConsultant,
  getAllConsultants,
  getConsultantById,
  updateConsultant,
  deleteConsultant,
} = require("../controllers/consultantcontroller");
const { verifyAdminToken } = require("../controllers/admincontroller");

const router = express.Router();

router.post("/addConsultant", verifyAdminToken, addConsultant);
router.get("/getAllConsultants", verifyAdminToken, getAllConsultants);
router.get("/getConsultantByID/:id", verifyAdminToken, getConsultantById);
router.put("/updateConsultant/:id", verifyAdminToken, updateConsultant);
router.delete("/deleteConsultant/:id", verifyAdminToken, deleteConsultant);

module.exports = router;
