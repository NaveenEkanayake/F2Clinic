const paymentModel = require("../models/payment");

const AppointmentPrice = async (req, res) => {
  try {
    const createAppointmentPrice = await paymentModel.create({
      ...req.body,
    });

    res.status(201).json({
      message: "Appointment price added successfully",
      data: createAppointmentPrice,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  AppointmentPrice,
};
