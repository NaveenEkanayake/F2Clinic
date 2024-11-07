const express = require("express");
const {
    addConsultant,
    getAllConsultants,
    getConsultantById,
    getAllConsultantNames,
    deleteConsultant,
    updateConsultant,
    getConsultantCount,
    getAllDoctors,
} = require("../controllers/consultantcontroller");
const { verifyAdminToken } = require("../controllers/admincontroller");
const { verifyUserToken } = require("../controllers/customercontroller");

const router = express.Router();

router.post("/addConsultants", verifyAdminToken, addConsultant);
router.get("/getAllConsultants", verifyAdminToken, getAllConsultants);
router.get("/getAllDoctors", verifyUserToken, getAllDoctors);
router.get("/getConsultantnames", verifyUserToken, getAllConsultantNames);
router.get("/getConsultantByID/:id", verifyAdminToken, getConsultantById);
router.get("/getConsultantCount", verifyAdminToken, getConsultantCount);
router.put("/updateConsultant/:id", verifyAdminToken, updateConsultant);
router.delete("/deleteConsultant/:id", verifyAdminToken, deleteConsultant);

module.exports = router;