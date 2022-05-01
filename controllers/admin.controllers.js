const moment = require("moment");
const Category = require("../models/Category");
const Order = require("../models/Order");
const SubCategory = require("../models/SubCategory");
const User = require("../models/User");
const Sale = require("../models/Sale");
const Banner = require("../models/Banner");

const aws = require("aws-sdk");
const s3 = new aws.S3({ apiVersion: "2006-03-01" });

// @desc Add Category
// @route POST api/admin/add-category
// @access Private
exports.addCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    await category.save();
    return res.status(201).send(category);
  } catch (error) {
    return res.status(400).json({ message: error.message });
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
    return res.status(400).json({ message: error.message });
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
    return res.status(400).json({ error: error.message });
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
    return res.status(400).json({ message: error.message });
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

// @desc Dashboard Statistics
// @route GET api/admin/dashboard
// @access Private
exports.dashboardStatistics = async (req, res, next) => {
  try {
    let totalPrice = 0;
    let salePrice = 0;
    const count = await Order.countDocuments();
    const orders = await Order.find({}).select("totalPrice salePrice");
    orders.forEach((order) => {
      totalPrice += order.totalPrice;
      salePrice += order.salePrice;
    });
    return res
      .status(200)
      .json({ totalPrice: totalPrice, salePrice: salePrice, count: count });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// @desc Confirm Orders
// @route PUT api/admin/order/confirm/:id
// @access Private
exports.confirmOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findByIdAndUpdate(
      id,
      { isConfirmed: req.body.isConfirmed },
      { new: true }
    );

    return res.status(200).send(order);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// @desc Add Sale Percent
// @route POST api/admin/add-sale
// @access Private
// exports.addSale = async (req, res, next) => {
//   try {
//     const sale = await Sale.insertMany(req.body);
//     return res.status(201).send(sale);
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

// @desc Get Sales List
// @route POST api/admin/sales
// @access Private
exports.getSales = async (req, res, next) => {
  try {
    const sales = await Sale.find({});
    return res.status(200).send(sales);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// @desc Update Sale Percent
// @route PUT api/admin/update-sale/:id
// @access Private
exports.updateSale = async (req, res, next) => {
  try {
    const saleId = req.params.id;
    const sale = await Sale.findByIdAndUpdate(
      saleId,
      { amount: req.body.amount, percent: req.body.percent },
      { new: true }
    );
    return res.status(200).send(sale);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// @desc Add A Banner
// @route POST api/admin/add-banner
// @access Private
exports.addBanner = async (req, res, next) => {
  try {
    let image = req.file.location;
    let key = image.substr(image.lastIndexOf("m/") + 2);

    const newBanner = new Banner({
      tag: req.body.tag,
      photo: image,
      categoryId: req.body.categoryId,
      key: key,
    });
    await newBanner.save();
    return res.status(200).send(newBanner);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// @desc Update A Banner
// @route PUT api/admin/update/banner/:id
// @access Private
exports.updateBanner = async (req, res, next) => {
  try {
    const bannerId = req.params.id;
    let image = req.file.location;
    let key = image.substr(image.lastIndexOf("m/") + 2);

    const deleteBanner = await Banner.findById(bannerId);

    let params = {
      Bucket: "lelokids",
      Key: deleteBanner.key,
    };

    try {
      await s3.deleteObject(params).promise();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }

    const banner = await Banner.findByIdAndUpdate(
      bannerId,
      {
        tag: req.body.tag,
        photo: image,
        categoryId: req.body.categoryId,
        key: key,
      },
      { new: true }
    );

    return res.status(200).send(banner);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// @desc Get Banners
// @route GET api/admin/list/banners
// @access Public
exports.getBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find({})
      .sort({ createdAt: -1 })
      .populate("categoryId");
    return res.status(200).send(banners);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
