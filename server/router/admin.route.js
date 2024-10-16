const express = require("express");
const {
  Signup,
  LoginUser,
  verifyAdminToken,
  getAdmin,
  refreshToken,
  adminLogout,
} = require("../controllers/admincontroller");
const router = express.Router();

router.post("/signupadmin", Signup);
router.post("/loginadmin", LoginUser);
router.get("/verifyadmin", verifyAdminToken, getAdmin);
router.get("/refreshadmin", refreshToken, verifyAdminToken, getAdmin);
router.post("/logoutadmin", verifyAdminToken, adminLogout);

module.exports = router;
