const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    cardholdername: {
      type: String,
      required: true,
    },
    cardnumber: {
      type: String,
      required: true,
    },
    ExpireDate: {
      type: Date,
      required: true,
    },
    Cvv: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
