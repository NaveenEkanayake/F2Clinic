require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

//env file
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const Signup = async(req, res) => {
    const { fullname, email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Please provide email and password." });
    }
    try {
        const exisitingAdmin = await Admin.findOne({ email });
        if (exisitingAdmin) {
            return res.status(400).json({
                message: "Admin already exists with this email.",
                user: exisitingAdmin,
            });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const admin = new Admin({
            fullname,
            email,
            password: hashedpassword,
        });
        await admin.save();
        return res.status(201).json({
            message: "Admin created successfully!",
            admin,
        });
    } catch (err) {
        console.error("Signup error:", err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const LoginUser = async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email and password are required." });
    }

    try {
        const existingAdmin = await Admin.findOne({ email });

        if (!existingAdmin) {
            return res
                .status(400)
                .json({ message: "Admin not found. Please sign up." });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingAdmin.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign({ id: existingAdmin._id }, JWT_SECRET_KEY, {
            expiresIn: "2h",
        });
        res.cookie("token", token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
            httpOnly: true,
            sameSite: "lax",
        });

        return res.status(200).json({
            message: "Login successful!",
            admin: existingAdmin,
            token,
        });
    } catch (err) {
        console.error("Login error:", err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const verifyAdminToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    if (!cookies) {
        return res.status(404).json({ message: "No cookies found" });
    }
    const token = cookies
        .split(";")
        .find((cookie) => cookie.trim().startsWith("token="));
    if (!token) {
        return res.status(404).json({ message: "No Token Found" });
    }

    const actualToken = token.split("=")[1];
    if (!actualToken) {
        return res.status(404).json({ message: "No Token Found" });
    }

    try {
        const decodedUser = jwt.verify(actualToken, JWT_SECRET_KEY);
        req.id = decodedUser.id;
        next();
    } catch (err) {
        console.error("Token verification error:", err.message);
        return res.status(400).json({ message: "Invalid Token" });
    }
};
// Get Admin by Token
const getAdmin = async(req, res) => {
    const adminId = req.id;
    try {
        const admin = await Admin.findById(adminId, "-password");
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).json({ admin });
    } catch (err) {
        console.error("Get Admin error:", err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const refreshToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    if (!cookies) {
        return res.status(400).json({ message: "No cookies found" });
    }

    const prevToken = cookies
        .split(";")
        .find((c) => c.trim().startsWith("token="));

    if (!prevToken) {
        return res.status(400).json({ message: "Couldn't find the token" });
    }

    const tokenValue = prevToken.split("=")[1];
    if (!tokenValue) {
        return res.status(400).json({ message: "Token value missing" });
    }
    jwt.verify(tokenValue, JWT_SECRET_KEY, (err, admin) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentication failed" });
        }

        // Generating a new token for the admin
        const token = jwt.sign({ id: admin.id }, JWT_SECRET_KEY, {
            expiresIn: "2h", // Token expiry in 2 hours
        });
        res.clearCookie("token"); // Clear the old token
        res.cookie("token", token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2-hour expiry
            httpOnly: true,
            sameSite: "lax",
        });

        req.id = admin.id;
        next(); // Move to the next middleware
    });
};

const adminLogout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies || !cookies.token) {
        return res.status(400).json({ message: "No cookies or token found" });
    }

    const token = cookies.token;

    try {
        jwt.verify(token, JWT_SECRET_KEY);
        res.clearCookie("token", { httpOnly: true });
        return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        console.log("Logout error:", err.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = {
    Signup,
    LoginUser,
    verifyAdminToken,
    getAdmin,
    refreshToken,
    adminLogout,
};