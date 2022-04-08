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
  dashboardStatistics,
  confirmOrder,
  addSale,
} = require("../controllers/admin.controllers");
const auth = require("../middleware/auth");

const router = express.Router();

router.route("/add-category").post(auth, addCategory);
router.route("/sub-category").post(auth, addSubCategory);
router.route("/categories").get(categoriesList);
router.route("/sub-categories/:categoryId").get(getSubCategories);
router.route("/users").get(auth, getUsersList);
router.route("/delete-user/:id").delete(auth, deleteUser);
router.route("/delete-category/:id").delete(auth, deleteCategory);
router.route("/delete-subcategory/:id").delete(auth, deleteSubCategory);
router.route("/sale-price/statistics").get(auth, salePriceStatistics);
router.route("/dashboard").get(auth, dashboardStatistics);
router.route("/order/confirm/:id").put(auth, confirmOrder);
router.route("/add-sale").post(auth, addSale);

module.exports = router;
