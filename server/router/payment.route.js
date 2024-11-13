const express = require("express");
const { AppointmentPrice } = require("../controllers/paymentcontroller");
const router = express.Router();

router.post("/AppointmentPayment", AppointmentPrice);
module.exports = router;