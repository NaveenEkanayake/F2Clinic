const express = require("express");
const {
    approveAppointment,
    getApprovalCount,
} = require("../controllers/approvalcontroller");
const {
    verifyConsultantToken,
} = require("../controllers/consultantlogincontroller");
const router = express.Router();
router.post("/addApprove", verifyConsultantToken, approveAppointment);
router.get("/getStatus", verifyConsultantToken, getApprovalCount);

module.exports = router;