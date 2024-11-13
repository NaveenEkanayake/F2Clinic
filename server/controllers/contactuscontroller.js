const ContactUs = require("../models/contactus");

const makeContact = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(400).json({ message: "User Id is Required." });
    }

    const createMessage = await ContactUs.create({
      ...req.body,
      userId,
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: createMessage,
    });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllMessages = async (req, res) => {
  const adminId = req.id;

  try {
    if (!adminId) {
      return res.status(400).json({
        message: "Admin Id cannot be found",
      });
    }

    const messages = await ContactUs.find({});

    return res.status(200).json({
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (e) {
    console.error("Error fetching messages:", e);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { makeContact, getAllMessages };
