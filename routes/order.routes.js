const express = require("express");
const {
  orderProducts,
  getOrder,
  deleteOrder,
} = require("../controllers/order.controllers");

const router = express.Router();

router.route("/products/check-out").post(orderProducts);
router.route("/admin/order/:orderId").get(getOrder);
router.route("/admin/delete-order/:orderId").delete(deleteOrder);

module.exports = router;
