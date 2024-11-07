require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Consultant = require("../models/consultantlogin");
const {
    sendConsultantForgotPasswordEmail,
} = require("../Email/ForgotConsultantPassword");

//env file
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const LoginConsultant = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email and password are required." });
    }

    try {
        const existingConsultant = await Consultant.findOne({ email });
        if (!existingConsultant) {
            return res
                .status(400)
                .json({ message: "Consultant not found. Please sign up." });
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingConsultant.password
        );
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password." });
        }
        const token = jwt.sign({
                id: existingConsultant._id,
                role: "consultant",
                email: existingConsultant.email,
                fullname: existingConsultant.fullname,
            },
            JWT_SECRET_KEY, {
                expiresIn: "2h",
            }
        );

        // Set the cookie with the token
        res.cookie("token", token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
            httpOnly: true,
            sameSite: "lax",
        });
        return res.status(200).json({
            message: "Login successful!",
            consultant: existingConsultant,
            token,
        });
    } catch (err) {
        console.error("Login error:", err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const verifyConsultantToken = (req, res, next) => {
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
        const decodedConsultant = jwt.verify(actualToken, JWT_SECRET_KEY);
        req.id = decodedConsultant.id;
        req.email = decodedConsultant.email;
        req.fullname = decodedConsultant.fullname;
        console.log("Decoded Consultant Data:", decodedConsultant);
        next();
    } catch (err) {
        console.error("Token verification error:", err.message);
        return res.status(400).json({ message: "Invalid Token" });
    }
};

// Get Consultant by Token
const getConsultant = async(req, res) => {
    const consultantId = req.id;
    try {
        const consultant = await Consultant.findById(consultantId, "-password");
        if (!consultant) {
            return res.status(404).json({ message: "Consultant not found" });
        }
        return res.status(200).json({ consultant });
    } catch (err) {
        console.error("Get Consultant error:", err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const refreshConsultantToken = (req, res, next) => {
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

    jwt.verify(prevToken, JWT_SECRET_KEY, (err, consultant) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentication failed" });
        }

        // Generating a new token
        const token = jwt.sign({ id: consultant.id }, JWT_SECRET_KEY, {
            expiresIn: "2h",
        });
        res.clearCookie("token"); // Clear the old token
        res.cookie("token", token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
            httpOnly: true,
            sameSite: "lax",
        });

        req.id = consultant.id;
        next();
    });
};

const logoutConsultant = (req, res) => {
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

const forgotConsultantPassword = async(req, res) => {
    const { email } = req.body;

    try {
        const consultant = await Consultant.findOne({ email: email });
        if (!consultant) {
            return res.status(404).send({ status: "consultant not found" });
        }

        const token = jwt.sign({ id: consultant._id }, JWT_SECRET_KEY, {
            expiresIn: "1h",
        });
        const resetLink = `http://localhost:5173/ResetConsultantPassword/${consultant._id}/${token}`;

        await sendConsultantForgotPasswordEmail(email, resetLink);

        res.send({ status: "Password reset email sent successfully" });
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        res.status(500).send({ status: "Error sending password reset email" });
    }
};

const resetConsultantPassword = async(req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.json({ status: "Error with Token" });
        } else {
            bcrypt
                .hash(password, 10)
                .then((hash) => {
                    return Consultant.findByIdAndUpdate(id, { password: hash });
                })
                .then((consultant) => {
                    if (!consultant) {
                        return res.json({ status: "consultant not found" });
                    }
                    res.json({ status: "Success" });
                })
                .catch((err) =>
                    res.json({ status: "Error updating password", error: err })
                );
        }
    });
};

module.exports = {
    LoginConsultant,
    verifyConsultantToken,
    getConsultant,
    refreshConsultantToken,
    logoutConsultant,
    forgotConsultantPassword,
    resetConsultantPassword,
};