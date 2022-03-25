const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

// @desc Add Category
// @route POST api/admin/add-category
// @access Private
exports.addCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    await category.save();
    return res.status(201).send(category);
  } catch (error) {
    return res.status(400).send("Unable to add new category", error);
  }
};

// @desc Add SubCategory
// @route POST api/admin/sub-category
// @access Private
exports.addSubCategory = async (req, res, next) => {
  try {
    const subCategory = new SubCategory(req.body);
    await subCategory.save();
    return res.status(201).send(subCategory);
  } catch (error) {
    return res.status(400).send("Unable to add new sub-category", error);
  }
};

// @desc Category List
// @route GET api/admin/categories
// @access Public
exports.categoriesList = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    return res.status(200).send(categories);
  } catch (error) {
    return res.status(400).send("Unable to return categories list", error);
  }
};

// @desc Sub Category List
// @route GET api/admin/sub-categories/:categoryId
// @access Public
exports.getSubCategories = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const subCategory = await SubCategory.find({ categoryId: categoryId });
    return res.status(200).send(subCategory);
  } catch (error) {
    return res.status(400).send("Unable to return sub categories", error);
  }
};
