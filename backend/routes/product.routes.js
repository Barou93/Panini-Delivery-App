const router = require('express').Router();

const productController = require('../controllers/product.controller');

const {checkAdmin} = require('../middleware/auth.middleware');

//Routes
const upload = require('../middleware/upload.middleware');

//Admins Products Routes

//Only Admins Panel Dashboard
router.post('/:categorieId/new', checkAdmin, upload.single('file'), productController.createProduct);

router.get('/:categorieId/products', productController.getAllProducts);

router.get('/:categorieId/products/:id', productController.readOneProduct);

//Only Admins Panel
router.put('/:categorieId/products/:id', checkAdmin, upload.single('file'), productController.updateProduct);

router.delete('/:categorieId/products/:id',  checkAdmin, productController.deleteProduct);

//Customers Products Routes
router.get('/', productController.showAllProducts);
router.get('/:id', productController.showProduct);



module.exports = router;