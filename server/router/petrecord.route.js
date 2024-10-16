const express = require("express");
const {
    addPetRecord,
    getAllPetRecords,
    getPetRecordById,
    updatePetRecord,
    deletePetRecord,
} = require("../controllers/petRecordcontroller");
const { verifyUserToken } = require("../controllers/customercontroller");
const router = express.Router();

router.post("/AddRecords", verifyUserToken, addPetRecord);
router.get("/getAllRecord", verifyUserToken, getAllPetRecords);
router.get("/getRecordByID/:id", verifyUserToken, getPetRecordById);
router.put("/UpdateRecord/:id", verifyUserToken, updatePetRecord);
router.delete("/DeleteRecord/:id", verifyUserToken, deletePetRecord);

module.exports = router;