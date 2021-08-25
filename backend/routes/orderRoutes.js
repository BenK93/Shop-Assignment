const express = require("express");
const router = express.Router();
const {
  getOrders,
  createOrder,
  setStatus,
} = require("../controller/orderControllers");

router.get("/:id/set-status", setStatus);
router.get("/", getOrders);
router.post("/", createOrder);

module.exports = router;
