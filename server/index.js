const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_PORT,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
const PetRecordRoute = require("./router/petrecord.route");
const ConsultantRoute = require("./router/consultant.route");
const AppointmentRoute = require("./router/Appointment.route");
const InventoryRoute = require("./router/inventory.route");
const UserRoute = require("./router/customer.route");
const AdminLoginRoute = require("./router/admin.route");
const ConsultantLoginRoute = require("./router/consultantlogin.route");
const CutomerImgroute = require("./router/customerprofileIMG.router");
const adminprofileRoute = require("./router/adminprofile.route");
const ConsultantProfileRoute = require("./router/consultantIMG.route");
const PetcareSupplyRoute = require("./router/petcaresupply.route");
const NotificationRoute = require("./router/notification.route");
const ContactUserRoute = require("./router/contactus.route");
const ApprovalRoute = require("./router/approval.route");
const paymentRoute = require("./router/payment.route");
// Use Routes
app.use("/api", PetRecordRoute);
app.use("/api", ConsultantRoute);
app.use("/api", AppointmentRoute);
app.use("/api", InventoryRoute);
app.use("/api", UserRoute);
app.use("/api", AdminLoginRoute);
app.use("/api", ConsultantLoginRoute);
app.use("/api", CutomerImgroute);
app.use("/api", adminprofileRoute);
app.use("/api", ConsultantProfileRoute);
app.use("/api", PetcareSupplyRoute);
app.use("/api", NotificationRoute);
app.use("/api", ContactUserRoute);
app.use("/api", ApprovalRoute);
app.use("/api", paymentRoute);

// Connect to MongoDB
const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Successfully connected to the database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
