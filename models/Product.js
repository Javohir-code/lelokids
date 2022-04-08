const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
  title: {
    type: String,
    minlength: 2,
    maxlength: 50,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  photos: {
    type: Array,
  },
  colors: {
    type: Array,
  },
  ages: {
    type: Array,
  },
  keys: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
