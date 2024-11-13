const PetRecords = require("../models/PetRecords");
const Customer = require("../models/customer");
const Consultant = require("../models/consultantlogin");

const isAuthorized = (role) => {
  return role === "consultant" || role === "customer";
};

const addPetRecord = async (req, res) => {
  const userId = req.id;

  try {
    let userRole;

    const customer = await Customer.findById(userId);
    const consultant = await Consultant.findById(userId);

    if (customer) {
      userRole = customer.role;
    } else if (consultant) {
      userRole = consultant.role;
    } else {
      return res.status(403).json({
        message: "Access denied: User not found.",
      });
    }

    if (!isAuthorized(userRole)) {
      return res.status(403).json({
        message: "Access denied: You are not authorized to add a pet record.",
      });
    }

    const existingRecordsCount = await PetRecords.countDocuments({
      UserId: userId,
    });

    const petRecord = await PetRecords.create({
      ...req.body,
      UserId: userId,
      Count: existingRecordsCount + 1,
    });

    res.status(201).json({
      message: "Pet record created successfully!",
      addedData: petRecord,
    });
  } catch (err) {
    console.error("Add Pet Record error:", err);
    res.status(400).json({ message: err.message });
  }
};

const countPetRecords = async (req, res) => {
  const userId = req.id;

  try {
    if (!userId) {
      return res.status(400).json({ message: "UserId is required." });
    }
    const petRecordCount = await PetRecords.countDocuments({
      UserId: userId,
    });

    return res.status(200).json({
      message: "Pet record count retrieved successfully",
      petRecordCount,
    });
  } catch (err) {
    console.error(`Error counting pet records for userId ${userId}:`, err);
    return res.status(500).json({ message: `Server Error: ${err.message}` });
  }
};
const getAllPetRecords = async (req, res) => {
  const userId = req.id;

  try {
    let userRole;

    const customer = await Customer.findById(userId);
    const consultant = await Consultant.findById(userId);

    if (customer) {
      userRole = customer.role;
    } else if (consultant) {
      userRole = consultant.role;
    } else {
      return res.status(403).json({
        message: "Access denied: User not found.",
      });
    }

    if (!isAuthorized(userRole)) {
      return res.status(403).json({
        message: "Access denied: You are not authorized to view pet records.",
      });
    }

    const allPetRecords = await PetRecords.find({ UserId: userId });

    if (allPetRecords.length === 0) {
      return res
        .status(404)
        .json({ message: "No pet records found for this user!" });
    }

    res.status(200).json({
      message: "Pet Records Retrieved successfully!!!",
      Retrieveddata: allPetRecords,
    });
  } catch (error) {
    console.error("Get All Pet Records error:", error);
    res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

const getAllConsultantPetRecords = async (req, res) => {
  try {
    const allPetRecords = await PetRecords.find({});

    if (allPetRecords.length === 0) {
      return res
        .status(404)
        .json({ message: "No pet records found for this user!" });
    }

    res.status(200).json({
      message: "Pet Records Retrieved successfully!!!",
      Retrieveddata: allPetRecords,
    });
  } catch (error) {
    console.error("Get All Pet Records error:", error);
    res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

const getPetRecordById = async (req, res) => {
  try {
    const petRecord = await PetRecords.findById(req.params.id);
    if (!petRecord) {
      return res.status(404).json({ message: "Pet record not found" });
    }
    res.json(petRecord);
  } catch (error) {
    console.error("Error fetching pet record:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updatePetRecord = async (req, res) => {
  const userId = req.id;
  const { id } = req.params;

  try {
    let userRole;

    const customer = await Customer.findById(userId);
    const consultant = await Consultant.findById(userId);

    if (customer) {
      userRole = customer.role;
    } else if (consultant) {
      userRole = consultant.role;
    } else {
      return res.status(403).json({
        message: "Access denied: User not found.",
      });
    }

    if (!isAuthorized(userRole)) {
      return res.status(403).json({
        message:
          "Access denied: You are not authorized to update this pet record.",
      });
    }

    const updatedPetRecord = await PetRecords.findOneAndUpdate(
      { _id: id, UserId: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPetRecord) {
      return res.status(404).json({
        message: "No pet record exists for this user or permission denied!",
      });
    }

    res.status(200).json({
      message: "Pet record updated successfully!",
      updatedData: updatedPetRecord,
    });
  } catch (err) {
    console.error("Update Pet Record error:", err);
    res.status(500).json({ message: "Internal server error: " + err.message });
  }
};

const deletePetRecord = async (req, res) => {
  const userId = req.id;
  const { id } = req.params;

  try {
    let userRole;

    const customer = await Customer.findById(userId);
    const consultant = await Consultant.findById(userId);

    if (customer) {
      userRole = customer.role;
    } else if (consultant) {
      userRole = consultant.role;
    } else {
      return res.status(403).json({
        message: "Access denied: User not found.",
      });
    }

    if (!isAuthorized(userRole)) {
      return res.status(403).json({
        message:
          "Access denied: You are not authorized to delete this pet record.",
      });
    }

    const deletedPetRecord = await PetRecords.findOneAndDelete({
      _id: id,
      UserId: userId,
    });

    if (!deletedPetRecord) {
      return res.status(404).json({
        message: "Pet record not found or permission denied!",
      });
    }

    res.status(200).json({
      message: "Pet record deleted successfully!",
      deletedData: deletedPetRecord,
    });
  } catch (err) {
    console.error("Delete Pet Record error:", err);
    res.status(500).json({ message: "Internal server error: " + err.message });
  }
};

module.exports = {
  addPetRecord,
  getAllPetRecords,
  getPetRecordById,
  updatePetRecord,
  deletePetRecord,
  countPetRecords,
  getAllConsultantPetRecords,
};
