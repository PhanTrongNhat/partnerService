const mongoose = require("mongoose");

const Partner = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  managerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  image: { type: String, required: true },
  GPKD: { type: String, required: true },
  CNATTP: { type: String, required: true },
});

const Product = mongoose.model("partners", Partner);

module.exports = Product;