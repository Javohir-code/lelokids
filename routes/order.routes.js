const express = require("express");
const {
  orderProducts,
  getOrder,
  deleteOrder,
  ordersList,
} = require("../controllers/order.controllers");

const router = express.Router();

router.route("/products/check-out").post(orderProducts);
router.route("/admin/order/:orderId").get(getOrder);
router.route("/admin/delete-order/:orderId").delete(deleteOrder);
router.route("/admin/orders").get(ordersList);

module.exports = router;
