const PetcaresupplyModel = require("../models/petcaresupply");

const addpetCareSupply = async(req, res) => {
    const adminId = req.id;
    if (!adminId) {
        return res.status(404).json({ message: "Admin Id is Required." });
    }

    try {
        const newPetCare = new PetcaresupplyModel({
            ...req.body,
            adminId: adminId,
        });
        await newPetCare.save();

        res.status(201).json({
            message: "Pet Care supply added Successfully!!!",
            newPetCare,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const getAllPetcareSupply = async(req, res) => {
    const adminId = req.id;

    try {
        const petCareSupply = await PetcaresupplyModel.find({ adminId });

        if (!petCareSupply || petCareSupply.length === 0) {
            return res
                .status(404)
                .json({ message: "No PetCare Supply found for this admin!" });
        }

        res.status(200).json({
            message: "PetCare Supply retrieved successfully",
            retrievedData: petCareSupply,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getPetCareSupplyById = async(req, res) => {
    const { id } = req.params;
    const adminId = req.id;
    try {
        if (!adminId) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const PetcareSupply = await PetcaresupplyModel.findById(id);
        if (!PetcareSupply) {
            return res
                .status(404)
                .json({ message: "No Pet care Supply items exists!" });
        }

        res.status(200).json({
            message: "Pet Care Suppply items retrieved successfully!",
            retrievedData: PetcareSupply,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updatePetCareSuppply = async(req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    delete updateData.SupplyImg;

    const adminId = req.id;

    try {
        if (!adminId) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const updatedPetCare = await PetcaresupplyModel.findByIdAndUpdate(
            id,
            updateData, { new: true }
        );

        if (!updatedPetCare) {
            return res.status(404).json({ message: "No Pet care items exist!" });
        }

        res.status(200).json({
            message: "Pet care updated successfully!",
            updatedData: updatedPetCare,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deletedPetCare = async(req, res) => {
    const { id } = req.params;
    const adminId = req.id;

    try {
        if (!adminId) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const deletedPetCare = await PetcaresupplyModel.findByIdAndDelete(id);
        if (!deletedPetCare) {
            return res.status(404).json({ message: "Pet care supply  not found!" });
        }

        res.status(200).json({
            message: "Pet care supply  deleted successfully!",
            deletedData: deletedPetCare,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addpetCareSupply,
    getAllPetcareSupply,
    getPetCareSupplyById,
    updatePetCareSuppply,
    deletedPetCare,
};