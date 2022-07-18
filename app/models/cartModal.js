const mongoose = require("mongoose");

const productList = new mongoose.Schema({
  productID: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
});

const CartSchema = new mongoose.Schema(
  {
    total: { type: String, default: "0" },
    feeShip: { type: String, default: "0" },
    customerID: { type: String },
    listProducts: [productList],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("carttest", CartSchema);

module.exports = Cart;
