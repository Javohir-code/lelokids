const express = require("express");
const {
  addCategory,
  addSubCategory,
  categoriesList
} = require("../controllers/admin.controllers");

const router = express.Router();

router.route("/add-category").post(addCategory);
router.route("/sub-category").post(addSubCategory);
router.route("/categories").get(categoriesList);

module.exports = router;
