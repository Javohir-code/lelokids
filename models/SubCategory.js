const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "subcategories",
  }
);

const Category = mongoose.model("SubCategory", subCategorySchema);

module.exports = Category;
