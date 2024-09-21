import mongoose from "mongoose";

const addConsultantSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter the Firstname"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter the Lastname"],
  },
  specialty: {
    type: String,
    required: [true, "Please enter the Speciality"],
  },
  email: {
    type: String,
    required: [true, "Please enter the Email"],
  },
  telephoneNumber: {
    type: Number,
    required: [true, "Please enter the Telephonenumber"],
  },
  from: {
    type: String,
    required: [true, "Please enter the 'from' time"],
  },
  to: {
    type: String,
    required: [true, "Please enter the 'to' time"],
  },
});

const AddConsultant = mongoose.model("AddConsultant", addConsultantSchema);

export default AddConsultant;
