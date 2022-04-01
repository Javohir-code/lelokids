const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orders: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
