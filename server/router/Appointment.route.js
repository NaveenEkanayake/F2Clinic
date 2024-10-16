const express = require("express");
const {
  addAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentcontroller");
const { verifyUserToken } = require("../controllers/customercontroller");

const router = express.Router();

router.post("/Appointment", verifyUserToken, addAppointment);
router.get("/getAppointment", verifyUserToken, getAllAppointments);
router.get("/getAppointmentById/:id", verifyUserToken, getAppointmentById);
router.put("/updateAppointment/:id", verifyUserToken, updateAppointment);
router.delete("/deleteAppointment/:id", verifyUserToken, deleteAppointment);

module.exports = router;
