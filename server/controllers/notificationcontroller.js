const Notification = require("../models/notification");
const Customer = require("../models/Customer");
const Consultant = require("../models/consultant");

const getAllEmails = async (req, res) => {
  try {
    const customers = await Customer.find({}, "email role");
    const formattedCustomers = customers.map((customer) => ({
      email: customer.email,
      role: customer.role,
    }));

    const consultants = await Consultant.find({}, "email");
    const formattedConsultants = consultants.map((consultant) => ({
      email: consultant.email,
      role: "consultant",
    }));

    res.status(200).json({
      message: "All customer and consultant emails retrieved successfully",
      formattedCustomers,
      formattedConsultants,
    });
  } catch (error) {
    console.error("Error retrieving emails:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendNotificationToCustomer = async (req, res) => {
  try {
    const { email, message } = req.body;
    const existingCustomerEmail = await Customer.findOne({ email: email });

    if (!existingCustomerEmail) {
      return res.status(404).json({ message: "Customer email not found" });
    }
    const response = await Notification.create({
      email: existingCustomerEmail.email,
      message,
    });

    res.status(200).json({
      message: "Notification Created Successfully for Customer!",
      response: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendNotificationToConsultant = async (req, res) => {
  try {
    const { email, message } = req.body;
    const existingConsultantEmail = await Consultant.findOne({ email: email });

    if (!existingConsultantEmail) {
      return res.status(404).json({ message: "Consultant email not found" });
    }
    const response = await Notification.create({
      email: existingConsultantEmail.email,
      message,
    });

    res.status(200).json({
      message: "Notification Created Successfully for Consultant!",
      response: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getNotificationsByEmail = async (req, res) => {
  try {
    const email = req.email;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const notifications = await Notification.find({ email: email.trim() });

    if (!notifications || notifications.length === 0) {
      return res
        .status(404)
        .json({ message: "No notifications found for this email." });
    }

    res.status(200).json({
      message: "Notifications retrieved successfully.",
      notifications: notifications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateNotification = async (req, res) => {
  try {
    const email = req.email;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    const updatedNotifications = await Notification.updateMany(
      { email: email.trim() },
      { $set: { isRead: true } }
    );

    if (updatedNotifications.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "No notifications found for this email." });
    }

    res.status(200).json({
      message: "Notifications updated successfully.",
      updatedCount: updatedNotifications.modifiedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllEmails,
  sendNotificationToCustomer,
  sendNotificationToConsultant,
  getNotificationsByEmail,
  updateNotification,
};
