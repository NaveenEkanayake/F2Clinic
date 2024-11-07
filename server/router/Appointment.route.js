const express = require("express");
const {
    addAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    countUserAppointments,
    countAppointmentPrices,
    getAllConsultantAppointments,
    countAllAppointments,
    getAllAppointmentPrices,
} = require("../controllers/appointmentcontroller");
const { verifyUserToken } = require("../controllers/customercontroller");
const {
    verifyConsultantToken,
} = require("../controllers/consultantlogincontroller");
const { get } = require("http");

const router = express.Router();

router.post("/addAppointment", verifyUserToken, addAppointment);
router.get("/getAllAppointment", verifyUserToken, getAllAppointments);
router.get("/appointmenttotal", verifyUserToken, countAppointmentPrices);
router.get("/getAppointmentById/:id", verifyUserToken, getAppointmentById);
router.get(
    "/getAllConsultantAppointments",
    verifyConsultantToken,
    getAllConsultantAppointments
);
router.get("/getAllprices", getAllAppointmentPrices);
router.get("/getAppointmentCount/:id", verifyUserToken, countUserAppointments);
router.get(
    "/getAllAppointmentCount",
    verifyConsultantToken,
    countAllAppointments
);
router.put("/updateAppointment/:id", verifyUserToken, updateAppointment);
router.delete("/deleteAppointment/:id", verifyUserToken, deleteAppointment);

module.exports = router;