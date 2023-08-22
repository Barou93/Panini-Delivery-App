"use strict";

var router = require("express").Router();

var orderController = require("../controllers/order.controller");

router.post("/:id/orders", orderController.createOrder);
router.get("/orders", orderController.getAllOrders);
router.get("/orders/:id", orderController.getOrder);
router.patch("/orders/:id", orderController.updateOrder);
router["delete"]("/orders/:id", orderController.deleteOrders);
module.exports = router;