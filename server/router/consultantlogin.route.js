const express = require("express");
const {
    LoginConsultant,
    verifyConsultantToken,
    getConsultant,
    refreshConsultantToken,
    logoutConsultant,
    resetConsultantPassword,
    forgotConsultantPassword,
} = require("../controllers/consultantlogincontroller");
const router = express.Router();
router.post("/loginConsultant", LoginConsultant);
router.get("/verifyConsultant", verifyConsultantToken, getConsultant);
router.get(
    "/refreshConsultant",
    refreshConsultantToken,
    verifyConsultantToken,
    getConsultant
);
router.post("/logoutConsultant", verifyConsultantToken, logoutConsultant);
router.post("/Consultantforgotpassword", forgotConsultantPassword);
router.post("/ResetConsultantPassword/:id/:token", resetConsultantPassword);

module.exports = router;