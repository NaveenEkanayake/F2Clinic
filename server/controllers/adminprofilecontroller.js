const adminimgModel = require("../models/adminprofile");

const admincreateImg = async(req, res) => {
    const adminId = req.id;
    const { AdminUrl } = req.body;
    if (!AdminUrl) {
        return res.status(400).json({ message: "AdminUrl is required." });
    }

    try {
        const createdadminImg = await adminimgModel.create({
            adminId,
            AdminUrl,
        });

        res.status(201).json({
            message: "Image uploaded successfully",
            createdData: createdadminImg,
        });
        console.log(createdadminImg);
    } catch (error) {
        console.error("Error saving image:", error);
        res
            .status(500)
            .json({ message: "Failed to upload image. Please try again later." });
    }
};

const admingetIMGURL = async(req, res) => {
    const adminId = req.id;

    try {
        const response = await adminimgModel
            .findOne({ adminId })
            .sort({ createdAt: -1 })
            .exec();

        if (!response) {
            return res.status(404).json({ message: "Image not found." });
        }
        res.status(200).json({
            message: "Image retrieved successfully.",
            AdminUrl: response.AdminUrl,
        });
    } catch (err) {
        console.error("Error retrieving image:", err);
        res.status(500).json({
            message: "Error retrieving image",
            error: err.message,
        });
    }
};

module.exports = { admincreateImg, admingetIMGURL };