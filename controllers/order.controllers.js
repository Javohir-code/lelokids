const Order = require("../models/Order");
const Product = require("../models/Product");

// @desc Order Products
// @route POST api/products/check-out
// @access Public
exports.orderProducts = async (req, res, next) => {
  try {
    const order = new Order(req.body);
    await order.save();
    return res.status(201).send(order);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// @desc Get Order By Id
// @route GET api/admin/order/:orderId
// @access Private
exports.getOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// @desc Delete An Order
// @route GET api/admin/delete-order/:orderId
// @access Private
exports.deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    await Order.findByIdAndDelete(orderId);
    return res.status(200).send("Order Deleted!");
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// @desc Orders List
// @route GET api/admin/orders
// @access Private
exports.ordersList = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate("userId");
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
