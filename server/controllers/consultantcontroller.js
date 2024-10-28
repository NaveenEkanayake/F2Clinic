const mongoose = require("mongoose");
const ConsultantModel = require("../models/consultant");
const bcrypt = require("bcrypt");
const randomize = require("randomatic");
const ConsultantLogin = require("../models/consultantlogin");
const { sendMail } = require("../Email/Sendmail");
const AdminModel = require("../models/admin");

const addConsultant = async(req, res) => {
    const { firstname, lastname, speciality, email, telephoneNumber } = req.body;
    const adminId = req.id;

    try {
        if (!firstname || !lastname || !speciality || !email) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingConsultant = await ConsultantLogin.findOne({ email });
        if (existingConsultant) {
            return res.status(400).json({
                message: "Consultant already exists with this email.",
                consultant: existingConsultant,
            });
        }

        const generatedPassword = randomize("Aa0", 8);
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);
        const fullName = `${firstname} ${lastname}`;

        const consultantLogin = new ConsultantLogin({
            fullname: fullName,
            email,
            password: hashedPassword,
            role: "consultant",
        });

        await consultantLogin.save();

        const newConsultant = new ConsultantModel({
            firstname,
            lastname,
            speciality,
            email,
            telephoneNumber,
            adminId,
        });

        await newConsultant.save();
        await sendMail(
            email,
            "Welcome to Furry Pet Clinic!",
            fullName,
            speciality,
            generatedPassword
        );

        return res
            .status(201)
            .json({ message: "Consultant added successfully!", newConsultant });
    } catch (err) {
        console.error("Add Consultant error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllConsultants = async(req, res) => {
    const adminId = req.id;

    try {
        const admin = await AdminModel.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }
        const allConsultants = await ConsultantModel.find({});

        if (allConsultants.length === 0) {
            return res.status(404).json({ message: "No consultants found." });
        }

        res.status(200).json({
            message: "Data retrieved successfully",
            retrievedData: allConsultants,
        });
    } catch (error) {
        console.error("Get All Consultants error:", error.message);
        res.status(500).json({
            message: "Internal server error.",
        });
    }
};

const getConsultantCount = async(req, res) => {
    try {
        const allRegisteredConsultant = await ConsultantModel.find({});
        const ConsultantCount = allRegisteredConsultant.length;

        if (ConsultantCount === 0) {
            return res
                .status(400)
                .json({ message: "No registered consultants found!" });
        }

        res.status(200).json({
            message: "Registered consultants retrieved successfully!",
            Consultants: ConsultantCount,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllConsultantnames = async(req) => {
    try {
        const allConsultants = await ConsultantModel.find({}, "firstname lastname");

        if (allConsultants.length === 0) {
            return { message: "No consultants found.", consultants: [] };
        }

        const consultantNames = allConsultants.map((consultant) => {
            return `Dr. ${consultant.firstname} ${consultant.lastname}`;
        });

        return {
            message: "Consultants retrieved successfully",
            consultants: consultantNames,
        };
    } catch (err) {
        throw new Error(err.message);
    }
};

const getConsultantById = async(req, res) => {
    const adminId = req.id;
    const { id } = req.params;

    try {
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const consultant = await ConsultantModel.findOne({
            _id: new ObjectId(id),
            adminId: adminId,
        });

        if (!consultant) {
            return res.status(404).json({ message: "Consultant not found" });
        }

        res.status(200).json({
            message: "Data retrieved successfully",
            retrievedData: consultant,
        });
    } catch (err) {
        console.error("Get Consultant By ID error:", err.message);
        res.status(500).json({
            message: "Internal server error.",
        });
    }
};

const updateConsultant = async(req, res) => {
    const adminId = req.id;
    const { id } = req.params;
    const trimmedId = id.trim();
    const updateData = req.body;

    try {
        if (!ObjectId.isValid(trimmedId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const updatedConsultant = await ConsultantModel.findOneAndUpdate({ _id: trimmedId, adminId: adminId },
            updateData, { new: true, runValidators: true }
        );

        if (!updatedConsultant) {
            return res
                .status(404)
                .json({ message: "Consultant not found or permission denied." });
        }

        res.status(200).json({
            message: "Consultant updated successfully!",
            updatedData: updatedConsultant,
        });
    } catch (err) {
        console.error("Error updating consultant:", err.message);
        res.status(500).json({ message: "Internal server error." });
    }
};

const deleteConsultant = async(req, res) => {
    const adminId = req.id;
    const { id } = req.params;

    try {
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const deletedConsultant = await ConsultantModel.findOneAndDelete({
            _id: id,
            adminId: adminId,
        });

        if (!deletedConsultant) {
            return res
                .status(404)
                .json({ message: "Consultant not found or permission denied." });
        }

        res.status(200).json({
            message: "Consultant deleted successfully!",
            deletedData: deletedConsultant,
        });
    } catch (err) {
        console.error("Error deleting consultant:", err.message);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    addConsultant,
    getAllConsultants,
    getConsultantById,
    updateConsultant,
    deleteConsultant,
    getAllConsultantnames,
    getConsultantCount,
};