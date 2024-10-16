const PetRecords = require("../models/PetRecords");
const Customer = require("../models/customer");
const Consultant = require("../models/consultantlogin");

const isAuthorized = (role) => {
  return role === "consultant" || role === "customer";
};

const addPetRecord = async (req, res) => {
  const userId = req.id; // Get user ID from the token

  try {
    // Retrieve user role from the Customer or Consultant schema
    let userRole;

    const customer = await Customer.findById(userId);
    const consultant = await Consultant.findById(userId);

    if (customer) {
      userRole = customer.role; // Set userRole to customer's role
    } else if (consultant) {
      userRole = consultant.role; // Set userRole to consultant's role
    } else {
      return res.status(403).json({
        message: "Access denied: User not found.",
      });
    }

    // Check if the user is either a consultant or a customer
    if (!isAuthorized(userRole)) {
      return res.status(403).json({
        message: "Access denied: You are not authorized to add a pet record.",
      });
    }

    // Create a new pet record with the authenticated user's ID
    const petRecord = await PetRecords.create({ ...req.body, UserId: userId });
    res.status(201).json({
      message: "Pet record created successfully!",
      addedData: petRecord,
    });
  } catch (err) {
    console.error("Add Pet Record error:", err); // Log the error for debugging
    res.status(400).json({ message: err.message });
  }
};

const getAllPetRecords = async (req, res) => {
  const userId = req.id; // Get user ID from the token

  try {
    // Retrieve user role from the Customer or Consultant schema
    let userRole;

    const customer = await Customer.findById(userId);
    const consultant = await Consultant.findById(userId);

    if (customer) {
      userRole = customer.role; // Set userRole to customer's role
    } else if (consultant) {
      userRole = consultant.role; // Set userRole to consultant's role
    } else {
      return res.status(403).json({
        message: "Access denied: User not found.",
      });
    }

    // Check if the user is either a consultant or a customer
    if (!isAuthorized(userRole)) {
      return res.status(403).json({
        message: "Access denied: You are not authorized to view pet records.",
      });
    }

    // Fetch all pet records belonging to the authenticated user
    const allPetRecords = await PetRecords.find({ UserId: userId });

    // Check if any pet records were found
    if (allPetRecords.length === 0) {
      return res
        .status(404)
        .json({ message: "No pet records found for this user!" });
    }

    // Return the found pet records
    res.status(200).json({
      message: "Pet Records Retrieved successfully!!!",
      Retrieveddata: allPetRecords,
    });
  } catch (error) {
    console.error("Get All Pet Records error:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};
const getPetRecordById = async (req, res) => {
  const userId = req.id; // Get user ID from the token
  const { id } = req.params; // Pet record ID from request parameters

  try {
    // Retrieve user role from the Customer or Consultant schema
    let userRole;

    const customer = await Customer.findById(userId);
    const consultant = await Consultant.findById(userId);

    if (customer) {
      userRole = customer.role; // Set userRole to customer's role
    } else if (consultant) {
      userRole = consultant.role; // Set userRole to consultant's role
    } else {
      return res.status(403).json({
        message: "Access denied: User not found.",
      });
    }

    // Check if the user is either a consultant or a customer
    if (!isAuthorized(userRole)) {
      return res.status(403).json({
        message:
          "Access denied: You are not authorized to view this pet record.",
      });
    }

    // Fetch the pet record by ID, ensuring it belongs to the authenticated user
    const petRecord = await PetRecords.findOne({ _id: id, UserId: userId });

    if (!petRecord) {
      return res.status(404).json({
        message: "No pet record exists for this user with the given ID!",
      });
    }

    res.status(200).json({
      message: "Pet record retrieved successfully!",
      retrievedData: petRecord,
    });
  } catch (err) {
    console.error("Get Pet Record by ID error:", err); // Log the error for debugging
    res.status(500).json({ message: "Internal server error: " + err.message });
  }
};
// Update a pet record for the authenticated user
const updatePetRecord = async (req, res) => {
  const userId = req.id; // Get user ID from the token
  const { id } = req.params; // Pet record ID from request parameters

  try {
    // Retrieve user role from the Customer or Consultant schema
    let userRole;

    const customer = await Customer.findById(userId);
    const consultant = await Consultant.findById(userId);

    if (customer) {
      userRole = customer.role; // Set userRole to customer's role
    } else if (consultant) {
      userRole = consultant.role; // Set userRole to consultant's role
    } else {
      return res.status(403).json({
        message: "Access denied: User not found.",
      });
    }

    // Check if the user is either a consultant or a customer
    if (!isAuthorized(userRole)) {
      return res.status(403).json({
        message:
          "Access denied: You are not authorized to update this pet record.",
      });
    }

    // Find and update the pet record for the authenticated user
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
    console.error("Update Pet Record error:", err); // Log the error for debugging
    res.status(500).json({ message: "Internal server error: " + err.message });
  }
};
// Delete a pet record for the authenticated user
const deletePetRecord = async (req, res) => {
  const userId = req.id; // Get user ID from the token
  const { id } = req.params; // Pet record ID from request parameters

  try {
    // Retrieve user role from the Customer or Consultant schema
    let userRole;

    const customer = await Customer.findById(userId);
    const consultant = await Consultant.findById(userId);

    if (customer) {
      userRole = customer.role; // Set userRole to customer's role
    } else if (consultant) {
      userRole = consultant.role; // Set userRole to consultant's role
    } else {
      return res.status(403).json({
        message: "Access denied: User not found.",
      });
    }

    // Check if the user is either a consultant or a customer
    if (!isAuthorized(userRole)) {
      return res.status(403).json({
        message:
          "Access denied: You are not authorized to delete this pet record.",
      });
    }

    // Find and delete the pet record for the authenticated user
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
    console.error("Delete Pet Record error:", err); // Log the error for debugging
    res.status(500).json({ message: "Internal server error: " + err.message });
  }
};

module.exports = {
  addPetRecord,
  getAllPetRecords,
  getPetRecordById,
  updatePetRecord,
  deletePetRecord,
};
