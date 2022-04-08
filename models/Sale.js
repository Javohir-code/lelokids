const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  percent: {
    type: Number,
    required: true,
  },
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
