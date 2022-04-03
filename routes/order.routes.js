const express = require("express");
const {
  orderProducts,
  getOrder,
  deleteOrder,
  ordersList,
} = require("../controllers/order.controllers");
const auth = require("../middleware/auth");

const router = express.Router();

router.route("/products/check-out").post(auth, orderProducts);
router.route("/admin/order/:orderId").get(auth, getOrder);
router.route("/admin/delete-order/:orderId").delete(auth, deleteOrder);
router.route("/admin/orders").get(auth, ordersList);

module.exports = router;
