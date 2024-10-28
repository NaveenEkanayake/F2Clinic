const express = require("express");
const {
    addAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    countUserAppointments,
} = require("../controllers/appointmentcontroller");
const { verifyUserToken } = require("../controllers/customercontroller");

const router = express.Router();

router.post("/Appointment", verifyUserToken, addAppointment);
router.get("/getAllAppointment", verifyUserToken, getAllAppointments);
router.get("/getAppointmentById/:id", verifyUserToken, getAppointmentById);
router.get("/getAppointmentCount/:id", verifyUserToken, countUserAppointments);
router.put("/updateAppointment/:id", verifyUserToken, updateAppointment);
router.delete("/deleteAppointment/:id", verifyUserToken, deleteAppointment);

module.exports = router;