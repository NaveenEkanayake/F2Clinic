const express = require("express");
const {
    addpetCareSupply,
    getAllPetcareSupply,
    deletedPetCare,
    updatePetCareSuppply,
    getPetCareSupplyById,
} = require("../controllers/petcaresupplycontroller");
const { verifyAdminToken } = require("../controllers/admincontroller");
const router = express.Router();

router.post("/addpetcaresupply", verifyAdminToken, addpetCareSupply);
router.get("/getAllpetcaresupply", verifyAdminToken, getAllPetcareSupply);
router.get("/getAllpetcaresupply/:id", verifyAdminToken, getPetCareSupplyById);
router.put("/updatepetcaresupply/:id", verifyAdminToken, updatePetCareSuppply);
router.delete("/deletepetcaresupply/:id", verifyAdminToken, deletedPetCare);
module.exports = router;