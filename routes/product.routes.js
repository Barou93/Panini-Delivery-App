const router = require("express").Router();

const productController = require("../controllers/product.controller");

const { checkAdmin } = require("../middleware/auth.middleware");

//Routes
const upload = require("../middleware/upload.middleware");

//Admins Products Routes

//Only Admins Panel Dashboard
router.post(
  "/new",

  checkAdmin,
  upload.single("file"),
  productController.createProduct
);

router.get("/:categorieId/products", productController.getAllProducts);

router.get("/:categorieId/products/:id", productController.readOneProduct);

//Only Admins Panel
router.put(
  "/:id",
  checkAdmin,
  upload.single("file"),
  productController.updateProduct
);

router.delete("/:id", checkAdmin, productController.deleteProduct);

/*router.delete(
  "/:categorieId/products",

  checkAdmin,
  productController.deleteAllProducts
);*/
//Customers Products Routes
router.get(
  "/",

  productController.showAllProducts
);
router.get("/:id", productController.showProduct);

module.exports = router;
