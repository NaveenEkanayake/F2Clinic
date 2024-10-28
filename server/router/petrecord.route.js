const express = require("express");
const {
    addPetRecord,
    getAllPetRecords,
    getPetRecordById,
    updatePetRecord,
    deletePetRecord,
    countPetRecords,
} = require("../controllers/petRecordcontroller");
const { verifyUserToken } = require("../controllers/customercontroller");
const router = express.Router();

router.post("/AddPetRecords", verifyUserToken, addPetRecord);
router.get("/getAllPetRecord", verifyUserToken, getAllPetRecords);
router.get("/getcountPetRecord/:id", verifyUserToken, countPetRecords);
router.get("/getPetRecordByID/:id", verifyUserToken, getPetRecordById);
router.put("/UpdatePetRecord/:id", verifyUserToken, updatePetRecord);
router.delete("/DeletePetRecord/:id", verifyUserToken, deletePetRecord);

module.exports = router;