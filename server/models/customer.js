const mongoose = require("mongoose");

const Customerschema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "customer",
  },
});
const Customer =
  mongoose.models.Customer || mongoose.model("Customer", Customerschema);

module.exports = Customer;
