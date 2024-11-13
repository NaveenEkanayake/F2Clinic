const express = require("express");
const {
  addPetRecord,
  getAllPetRecords,
  getPetRecordById,
  updatePetRecord,
  deletePetRecord,
  countPetRecords,
  getAllConsultantPetRecords,
} = require("../controllers/petRecordcontroller");
const { verifyUserToken } = require("../controllers/customercontroller");
const {
  verifyConsultantToken,
} = require("../controllers/consultantlogincontroller");
const router = express.Router();

router.post("/AddPetRecords", verifyUserToken, addPetRecord);
router.get("/getAllPetRecord", verifyUserToken, getAllPetRecords);
router.get("/getAllConsultantPetRecord", getAllConsultantPetRecords);
router.get("/getcountPetRecord", verifyUserToken, countPetRecords);
router.get("/getPetRecordByid/:id", verifyUserToken, getPetRecordById);
router.put("/UpdatePetRecord/:id", verifyUserToken, updatePetRecord);
router.delete("/DeletePetRecord/:id", verifyUserToken, deletePetRecord);

module.exports = router;
