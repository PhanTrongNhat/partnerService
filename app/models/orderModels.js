const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    listProducts: [
      {
        _id: { type: mongoose.ObjectId, required: false },
      },
    ],
    shippingAddress: {
      fullname: {
        type: String,

        default: "",
        default: false,
      },
      address: {
        type: String,

        default: "",
        default: false,
      },
      city: {
        type: String,

        default: "",
        default: false,
      },
      country: {
        type: String,
        default: "",
        default: false,
      },
      postalCode: {
        type: Number,
        default: false,
        default: 0,
      },
    },
    paymentMethod: {
      require: false,
      type: String,
      default: "PayPal",
    },
    feeShip: { type: String, required: false, default: false },
    status: { type: String, required: false, default: 0 },
    stafdId: { type: mongoose.ObjectId, required: false, default: null },
    total: { type: String, default: false },
    isPaid: { type: Boolean, default: false },
    customerId: { type: mongoose.Schema.Types.ObjectId, required: false },
    // isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Product = mongoose.model("invoices", schema);

module.exports = Product;


