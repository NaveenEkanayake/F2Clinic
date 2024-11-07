const ConsultantProfileIMG = require("../models/consultantprofile");

const createImg = async(req, res) => {
    const ConsultantId = req.id;
    const { ConsultantUrl } = req.body;

    if (!ConsultantUrl) {
        return res.status(400).json({ message: "Image URL is required." });
    }

    try {
        const createdImg = await ConsultantProfileIMG.create({
            ConsultantId,
            ConsultantUrl,
        });

        res.status(201).json({
            message: "Image uploaded successfully",
            createdData: createdImg,
        });
        console.log(createdImg);
    } catch (error) {
        console.error("Error saving image:", error);
        res.status(500).json({
            message: "Failed to upload image. Please try again later.",
            error: error.message,
        });
    }
};

const getIMGURL = async(req, res) => {
    const ConsultantId = req.id;

    try {
        const response = await ConsultantProfileIMG.findOne({ ConsultantId })
            .sort({ createdAt: -1 })
            .exec();

        console.log(response);

        if (!response) {
            return res.status(404).json({ message: "Image not found." });
        }

        res.status(200).json({
            message: "Image retrieved successfully.",
            ConsultantUrl: response.ConsultantUrl,
        });
    } catch (err) {
        console.error("Error retrieving image:", err);
        res.status(500).json({
            message: "Error retrieving image",
            error: err.message,
        });
    }
};

module.exports = { createImg, getIMGURL };