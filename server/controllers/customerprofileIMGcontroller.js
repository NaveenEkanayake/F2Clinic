const CustomerProfileIMG = require("../models/CustomerProfileIMG");

const createImg = async (req, res) => {
  const userId = req.id;
  const { IMGurl } = req.body;
  if (!IMGurl) {
    return res.status(400).json({ message: "Image URL is required." });
  }

  try {
    const createdImg = await CustomerProfileIMG.create({
      userId,
      IMGurl,
    });

    res.status(201).json({
      message: "Image uploaded successfully",
      createdData: createdImg,
    });
    console.log(createdImg);
  } catch (error) {
    console.error("Error saving image:", error);
    res
      .status(500)
      .json({ message: "Failed to upload image. Please try again later." });
  }
};

const getIMGURL = async (req, res) => {
  const userId = req.id;

  try {
    const response = await CustomerProfileIMG.findOne({ userId })
      .sort({ createdAt: -1 })
      .exec();

    if (!response) {
      return res.status(404).json({ message: "Image not found." });
    }
    res.status(200).json({
      message: "Image retrieved successfully.",
      IMGurl: response.IMGurl,
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
