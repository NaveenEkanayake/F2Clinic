const express = require("express");
const { makeContact, getAllMessages } = require("../controllers/contactuscontroller");
const { verifyUserToken } = require("../controllers/customercontroller");
const { verifyAdminToken } = require("../controllers/admincontroller")
const router = express.Router();

router.post("/MakeContact", verifyUserToken, makeContact);
router.get("/GetAllMessage", verifyAdminToken, getAllMessages);

module.exports = router;