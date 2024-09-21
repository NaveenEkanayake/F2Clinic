import AddConsultant from "../models/Addconsultant.js";

const addConsultant = async (req, res) => {
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
    res.status(500).json({ error: "Error adding consultant" });
  }
};
// Function to get consultant by email
const getConsultantByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const consultant = await AddConsultant.findOne({ email });

    if (!consultant) {
      return res.status(404).json({ message: "Consultant not found" });
    }

    res.status(200).json(consultant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Function to get consultant by ID
const getConsultant = async (req, res) => {
  try {
    const { id } = req.params;
    const consultant = await AddConsultant.findById(id);
    if (!consultant) {
      return res.status(404).json({ message: "Consultant not found" });
    }
    res.status(200).json(consultant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to delete consultant by ID
const deleteConsultant = async (req, res) => {
  try {
    const { id } = req.params;
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
};

const getConsultantByFirstName = async (req, res) => {
  try {
    const { firstName } = req.params;
    const consultant = await AddConsultant.findOne({ firstName });

    if (!consultant) {
      return res.status(404).json({ message: "Consultant not found" });
    }

    res.status(200).json(consultant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get consultant by last name
const getConsultantByLastName = async (req, res) => {
  try {
    const { lastName } = req.params;
    const consultant = await AddConsultant.findOne({ lastName });

    if (!consultant) {
      return res.status(404).json({ message: "Consultant not found" });
    }

    res.status(200).json(consultant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getConsultantsRecentMessage = async () => {
  try {
    const consultants = await AddConsultant.find({});
    const updatedConsultants = await AddConsultant.find({});
    const previousCount = consultants.length;
    const updatedCount = updatedConsultants.length;
    if (updatedCount > previousCount) {
      const newlyAddedConsultant =
        updatedConsultants[updatedConsultants.length - 1];
      const message = `You have added ${newlyAddedConsultant.firstName} ${newlyAddedConsultant.lastName} to Clinic !!!`;

      return { consultants, toastMessage: message };
    } else {
      return { consultants, toastMessage: null };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  addConsultant,
  getConsultant,
  deleteConsultant,
  getConsultantByFirstName,
  getConsultantByLastName,
  getConsultantsRecentMessage,
  getConsultantByEmail,
};
