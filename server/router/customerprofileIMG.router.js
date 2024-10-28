const express = require("express");
const {
    createImg,
    getIMGURL,
} = require("../controllers/customerprofileIMGcontroller");
const { verifyUserToken } = require("../controllers/customercontroller");
const router = express.Router();

router.post("/addimg", verifyUserToken, createImg);
router.get("/getIMG", verifyUserToken, getIMGURL);
module.exports = router;