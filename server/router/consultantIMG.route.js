const express = require("express");
const {
    createImg,
    getIMGURL,
} = require("../controllers/consultantprofileIMGcontroller");
const {
    verifyConsultantToken,
} = require("../controllers/consultantlogincontroller");
const router = express.Router();

router.post("/addConsultantimg", verifyConsultantToken, createImg);
router.get("/getConsultantIMG", verifyConsultantToken, getIMGURL);
module.exports = router;