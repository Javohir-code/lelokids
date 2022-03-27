const express = require("express");
const {
  addCategory,
  addSubCategory,
  categoriesList,
  getSubCategories,
  getUsersList,
  deleteUser,
} = require("../controllers/admin.controllers");

const router = express.Router();

router.route("/add-category").post(addCategory);
router.route("/sub-category").post(addSubCategory);
router.route("/categories").get(categoriesList);
router.route("/sub-categories/:categoryId").get(getSubCategories);
router.route("/users").get(getUsersList);
router.route("/delete-user/:id").delete(deleteUser);

module.exports = router;
