import mongoose from "mongoose";
import express from "express";
import AddConsultant from "./models/Addconsultant.js";
import cors from "cors";
import { sendEmailRoute } from "./Sendemail.js";
import Addinventory from "./models/Addinventory.js";
import Inventory from "./models/Addinventory.js";
import AdminLogin from "./models/Adminlogin.js";
import CustomerLoginModel from "./models/CustomerLogin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { ObjectId } = mongoose.Types;

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.post("/api/consultants", async(req, res) => {
    try {
        const newConsultant = new AddConsultant(req.body);
        await newConsultant.save();
        console.log("Consultant added successfully:", newConsultant);

        res.status(201).json({
            message: "Consultant added successfully",
            consultant: newConsultant,
        });
    } catch (error) {
        console.error("Error adding consultant:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get consultant by ID
app.get("/api/consultants/:id", async(req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid consultant ID format" });
        }

        const consultant = await AddConsultant.findById(id);
        if (!consultant) {
            return res.status(404).json({ message: "Consultant not found" });
        }
        res.status(200).json(consultant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update API
app.put("/api/consultants/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;
        const consultant = await AddConsultant.findByIdAndUpdate(id, updateFields, {
            new: true,
        });

        if (!consultant) {
            return res.status(404).json({ message: "Consultant not found" });
        }

        res.status(200).json(consultant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all consultants from the database
app.get("/api/consultants", async(req, res) => {
    try {
        const consultants = await AddConsultant.find({});
        res.status(200).json(consultants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Delete consultant by ID
app.delete("/api/consultants/:id", async(req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid consultant ID format" });
        }

        const consultant = await AddConsultant.findByIdAndDelete(id);
        if (!consultant) {
            return res.status(404).json({ message: "Consultant not found" });
        }
        res.status(200).json({
            message: "Consultant deleted successfully",
            deletedConsultant: consultant,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get consultant by email
app.get("/api/consultants/email/:email", async(req, res) => {
    const email = req.params.email;
    try {
        const consultant = await AddConsultant.findOne({ email: email });
        if (!consultant) {
            return res.status(404).json({ error: "Consultant not found" });
        }
        res.status(200).json(consultant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post("/api/sendEmail", sendEmailRoute);

// Get inventory item by ID
app.get("/api/inventory/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const inventoryItem = await Inventory.findById(id);
        if (!inventoryItem) {
            return res.status(404).json({ message: "Inventory item not found" });
        }
        res.status(200).json(inventoryItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/inventoryadd", async(req, res) => {
    console.log(req.body);
    try {
        const newInventory = new Addinventory(req.body);
        await newInventory.save();
        console.log("Inventory item added successfully:", newInventory);

        res.status(201).json({
            message: "Inventory item added successfully",
            inventory: newInventory,
        });
    } catch (error) {
        console.error("Error adding inventory item:", error);
        res.status(500).json({ error: error.message });
    }
});

// Update inventory item by ID
app.put("/api/inventory/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;
        const updatedInventory = await Inventory.findByIdAndUpdate(
            id,
            updateFields, {
                new: true,
            }
        );

        if (!updatedInventory) {
            return res.status(404).json({ message: "Inventory item not found" });
        }

        res.status(200).json(updatedInventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all inventory items
app.get("/api/inventory", async(req, res) => {
    try {
        const inventory = await Inventory.find({});
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete inventory item by ID
app.delete("/api/inventory/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deletedInventory = await Inventory.findByIdAndDelete(id);
        if (!deletedInventory) {
            return res.status(404).json({ message: "Inventory item not found" });
        }
        res.status(200).json({
            message: "Inventory item deleted successfully",
            deletedInventory: deletedInventory,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Add a new admin
app.post("/api/adminadd", async(req, res) => {
    try {
        const newAdmin = new AdminLogin(req.body);
        await newAdmin.save();
        console.log("Admin added successfully:", newAdmin);

        res.status(201).json({
            message: "Admin added successfully",
            admin: newAdmin,
        });
    } catch (error) {
        console.error("Error adding admin:", error);
        res.status(500).json({ error: error.message });
    }
});
app.post("/api/adminauthentication", async(req, res) => {
    try {
        const { UserName, Password } = req.body;
        const admin = await AdminLogin.findOne({ UserName });

        if (!admin) {
            return res.status(401).json({ message: "Login unsuccessful" });
        }
        if (UserName === admin.UserName && Password === admin.Password) {
            return res.status(200).json({ message: "Login successful" });
        } else {
            return res.status(401).json({ message: "Login unsuccessful" });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: error.message });
    }
});
app.post("/api/customers/register", async(req, res) => {
    try {
        console.log("Registration request received:", req.body);
        const { UserName, Email, Password, ConfirmPassword } = req.body;

        // Check if passwords match
        if (Password !== ConfirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check if user with given email already exists
        const existingUser = await CustomerLoginModel.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Create a new user
        const newUser = new CustomerLoginModel({
            UserName,
            Email,
            Password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token with UserName
        const token = jwt.sign({ id: newUser._id, UserName: newUser.UserName },
            "your_jwt_secret", {
                expiresIn: "1h",
            }
        );

        // Send success response with token
        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        // Handle errors
        console.error("Error registering user:", error);
        res
            .status(500)
            .json({ message: "Error registering user", error: error.message });
    }
});

app.get("/api/username", async(req, res) => {
    try {
        // Extract token from Authorization header and remove "Bearer " prefix
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ message: "Unauthorized: Missing or invalid token" });
        }

        const token = authHeader.replace("Bearer ", "");

        // Verify and decode JWT token
        const decoded = jwt.verify(token, "your_jwt_secret");

        // Extract UserName from decoded JWT payload
        const UserName = decoded.UserName;

        // Return UserName in the response
        res.status(200).json({ UserName });
    } catch (error) {
        // Handle errors
        console.error("Error retrieving UserName:", error);
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        res
            .status(500)
            .json({ message: "Error retrieving UserName", error: error.message });
    }
});

// MongoDB connection setup
const dbURI =
    "mongodb+srv://nekanayake789:Naveen%23123@furrypets.sfoid0i.mongodb.net/?retryWrites=true&w=majority&appName=furrypets";
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the database!!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Connection failed:", error);
    });