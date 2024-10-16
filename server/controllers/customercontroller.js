require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/customer");

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
        const exisitingUser = await User.findOne({ email });
        if (exisitingUser) {
            return res.status(400).json({
                message: "User already exists with this email.",
                user: exisitingUser,
            });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const user = new User({
            fullname,
            email,
            password: hashedpassword,
        });
        await user.save();
        return res.status(201).json({
            message: "User created successfully!",
            user,
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
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res
                .status(400)
                .json({ message: "User not found. Please sign up." });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
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
            user: existingUser,
            token,
        });
    } catch (err) {
        console.error("Login error:", err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const verifyUserToken = (req, res, next) => {
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
        req.userRole = decodedUser.role;
        next();
    } catch (err) {
        console.error("Token verification error:", err.message);
        return res.status(400).json({ message: "Invalid Token" });
    }
};

// Get User by Token
const getUser = async(req, res) => {
    const userId = req.id;
    try {
        const user = await User.findById(userId, "-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.error("Get User error:", err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const refreshToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies ?
        cookies
        .split(";")
        .find((c) => c.trim().startsWith("token="))
        .split("=")[1] :
        null;

    if (!prevToken) {
        return res.status(400).json({ message: "Couldn't find the token" });
    }

    jwt.verify(prevToken, JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentication failed" });
        }

        // Generating a new token
        const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
            expiresIn: "2h",
        });
        res.clearCookie("token"); // Clear the old token
        res.cookie("token", token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
            httpOnly: true,
            sameSite: "lax",
        });

        req.id = user.id;
        next();
    });
};

const logout = (req, res) => {
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
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = {
    Signup,
    LoginUser,
    verifyUserToken,
    getUser,
    refreshToken,
    logout,
};