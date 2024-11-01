const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_PORT,
        methods: ["GET", "POST"],
        credentials: true,
    },
});
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.emit("welcome", { message: "Welcome to the Socket.IO server!" });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_PORT,
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    req.io = io;
    next();
});

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

// Connect to MongoDB
const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3000;

mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to the database");
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });