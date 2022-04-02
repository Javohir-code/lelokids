const express = require("express");
const {
  addCategory,
  addSubCategory,
  categoriesList,
  getSubCategories,
  getUsersList,
  deleteUser,
  deleteCategory,
  deleteSubCategory,
  salePriceStatistics,
} = require("../controllers/admin.controllers");

const router = express.Router();

router.route("/add-category").post(addCategory);
router.route("/sub-category").post(addSubCategory);
router.route("/categories").get(categoriesList);
router.route("/sub-categories/:categoryId").get(getSubCategories);
router.route("/users").get(getUsersList);
router.route("/delete-user/:id").delete(deleteUser);
router.route("/delete-category/:id").delete(deleteCategory);
router.route("/delete-subcategory/:id").delete(deleteSubCategory);
router.route("/sale-price/statistics").get(salePriceStatistics);

module.exports = router;
