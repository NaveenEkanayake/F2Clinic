const express = require("express");
const {
  LoginConsultant,
  verifyConsultantToken,
  getConsultant,
  refreshConsultantToken,
  logoutConsultant,
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

module.exports = router;
