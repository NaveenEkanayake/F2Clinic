const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_PORT,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Optional: Emit a welcome message to the newly connected client
  socket.emit("welcome", { message: "Welcome to the Socket.IO server!" });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Middleware for CORS and parsing
app.use(
  cors({
    origin: process.env.CLIENT_PORT,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Attach Socket.IO to the request object
app.use((req, res, next) => {
  req.io = io; // No need to check if req.io is set; it's always set here
  next();
});

// Test endpoint to emit a socket event
app.get("/test-socket", (req, res) => {
  req.io.emit("testEvent", {
    message: "This is a direct test message from the server.",
  });
  res.send("Direct test event emitted");
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
const PORT = process.env.PORT;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Successfully connected to the database");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
