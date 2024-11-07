const express = require("express");
const {
    Signup,
    LoginUser,
    verifyUserToken,
    getUser,
    refreshToken,
    logout,
    getCustomerCount,
    forgotPassword,
    resetPassword,
} = require("../controllers/customercontroller");
const { verifyAdminToken } = require("../controllers/admincontroller");
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", LoginUser);
router.get("/getRegisteredCustomerCount", verifyAdminToken, getCustomerCount);
router.get("/verifyusertoken", verifyUserToken, getUser);
router.get("/refresh", refreshToken, verifyUserToken, getUser);
router.post("/logout", verifyUserToken, logout);
router.post("/Customerforgotpassword", forgotPassword);
router.post("/ResetPassword/:id/:token", resetPassword);

module.exports = router;