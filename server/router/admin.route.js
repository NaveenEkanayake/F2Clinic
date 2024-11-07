const express = require("express");
const {
    Signup,
    LoginAdmin,
    verifyAdminToken,
    getAdmin,
    refreshToken,
    adminLogout,
    forgotAdminPassword,
    resetAdminPassword,
} = require("../controllers/admincontroller");
const router = express.Router();

router.post("/signupadmin", Signup);
router.post("/loginadmin", LoginAdmin);
router.get("/verifyadmin", verifyAdminToken, getAdmin);
router.get("/refreshadmin", refreshToken, verifyAdminToken, getAdmin);
router.post("/logoutadmin", verifyAdminToken, adminLogout);
router.post("/Adminforgotpassword", forgotAdminPassword);
router.post("/ResetAdminPassword/:id/:token", resetAdminPassword);

module.exports = router;