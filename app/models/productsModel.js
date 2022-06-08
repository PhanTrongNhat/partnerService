const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const options = {
  page: 1,
  limit: 10,
  collation: {
    locale: "en",
  },
};
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryID: { type: mongoose.Schema.Types.ObjectId, required: false, default:null },
  quantity: { type: Number, default: 50 },
  supplierID: { type: mongoose.Schema.Types.ObjectId, required: false, default:null },
  price: { type: Number, default: 0 },
  image: { type: String, required: true },
  NSX: { type: String, required: true },
  HSD: { type: String, required: true },
});
ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", ProductSchema);

Product.paginate().then({}); // Usage


module.exports = Product;
