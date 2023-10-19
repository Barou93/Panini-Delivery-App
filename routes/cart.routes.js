/** @format */

const router = require("express").Router();

const cartController = require("../controllers/cart.controller");

router.post("/", cartController.addToCart);
router.get("/", cartController.getCarts);
//router.get("/", cartController.getCart);
router.patch("/:id/add-qty", cartController.addQuantity);
router.patch("/:id/remove-qty", cartController.removeQuantity);
router.delete("/:cartId/items", cartController.deleteCartItem);
router.delete("/:id", cartController.deleteAllItems);

module.exports = router;
