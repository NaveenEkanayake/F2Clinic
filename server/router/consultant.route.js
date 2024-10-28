const express = require("express");
const {
    addConsultant,
    getAllConsultants,
    getConsultantById,
    getAllConsultantnames,
    deleteConsultant,
    updateConsultant,
    getConsultantCount,
} = require("../controllers/consultantcontroller");
const { verifyAdminToken } = require("../controllers/admincontroller");

const router = express.Router();

router.post("/addConsultants", verifyAdminToken, addConsultant);
router.get("/getAllConsultants", verifyAdminToken, getAllConsultants);
router.get(
    "/getAllAppointmentConsultants",
    verifyAdminToken,
    getAllConsultantnames
);
router.get("/getConsultantByID/:id", verifyAdminToken, getConsultantById);
router.get("/getConsultantCount", verifyAdminToken, getConsultantCount);
router.put("/updateConsultant/:id", verifyAdminToken, updateConsultant);
router.delete("/deleteConsultant/:id", verifyAdminToken, deleteConsultant);

module.exports = router;