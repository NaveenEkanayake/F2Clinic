const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
app.use(
    cors({
        origin: process.env.CLIENT_PORT,
        credentials: true,
    })
);

//routes
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

//env files
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

//middlewares
app.use(express.json());
app.use(cookieParser());
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
//connection
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoose
        .connect(MONGODB_URL)
        .then(() => {
            console.log("Successfully connected to the database");
        })
        .catch((error) => {
            console.log("Error:", error);
        });
});