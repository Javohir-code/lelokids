const Category = require("../models/Category");
const Order = require("../models/Order");
const SubCategory = require("../models/SubCategory");
const User = require("../models/User");
const moment = require("moment");

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
    const subCategory = await SubCategory.insertMany(req.body);
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

// @desc Get List Of Users
// @route GET api/admin/users
// @access Private
exports.getUsersList = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// @desc Delete User
// @route DELETE api/admin/delete-user/:id
// @access Private
exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    return res.status(200).send("User deleted");
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// @desc Delete Category
// @route DELETE api/admin/delete-category/:id
// @access Private
exports.deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndDelete(id);
    if (category._id) {
      await SubCategory.deleteMany({ categoryId: category._id });
    }
    return res.status(200).send("Category Deleted");
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// @desc Delete Sub-Category
// @route DELETE api/admin/delete-subcategory/:id
// @access Private
exports.deleteSubCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    await SubCategory.findByIdAndDelete(id);
    return res.status(200).send("Sub-Category Deleted");
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// @desc Sale Price Statistics
// @route GET api/admin/sale-price/statistics
// @access Private
exports.salePriceStatistics = async (req, res, next) => {
  try {
    const { year } = req.query;
    let total = 0;
    const result = [];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const salePrices = await Order.find({}).select("salePrice createdAt");
    months.forEach((month) => {
      let filtered = {};
      let count = 0;
      let total = 0;

      salePrices.forEach((sale) => {
        createdAtMonth = moment(sale.createdAt).format("MMMM");
        if (
          year == moment(sale.createdAt).format("YYYY") &&
          month == createdAtMonth
        ) {
          total += sale.salePrice;
          count++;
        }
      });
      filtered = { month: month, amount: total, count: count };

      result.push(filtered);
    });
    return res.status(200).json({ result: result });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
