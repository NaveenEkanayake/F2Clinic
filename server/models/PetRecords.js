const mongoose = require("mongoose");
const numeral = require("numeral");

const petrecordSchema = new mongoose.Schema({
  Petname: {
    type: String,
    required: true,
  },
  Petimage: {
    type: String,
    required: false,
  },
  Breed: {
    type: String,
    required: false,
  },
  Age: {
    type: Number,
    required: false,
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const PetRecords = mongoose.model("Pet Records", petrecordSchema);

module.exports = PetRecords;