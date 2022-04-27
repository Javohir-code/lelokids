const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
    required: true,
  },
  key: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
