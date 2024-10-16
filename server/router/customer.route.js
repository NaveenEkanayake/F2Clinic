const express = require("express");
const {
  Signup,
  LoginUser,
  verifyUserToken,
  getUser,
  refreshToken,
  logout,
} = require("../controllers/customercontroller");
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", LoginUser);
router.get("/verifyusertoken", verifyUserToken, getUser);
router.get("/refresh", refreshToken, verifyUserToken, getUser);
router.post("/logout", verifyUserToken, logout);

module.exports = router;
