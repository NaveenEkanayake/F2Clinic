const express = require("express");
const {
    admincreateImg,
    admingetIMGURL,
} = require("../controllers/adminprofilecontroller");
const { verifyAdminToken } = require("../controllers/admincontroller");
const router = express.Router();

router.post("/adminimg", verifyAdminToken, admincreateImg);
router.get("/getadminIMG", verifyAdminToken, admingetIMGURL);
module.exports = router;