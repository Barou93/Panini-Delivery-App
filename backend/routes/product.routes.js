const router = require('express').Router();

const productController = require('../controllers/product.controller');

//Routes
const upload = require('../middleware/upload.middleware');

//Admins Products Routes

router.post('/:categorieId/new', upload.single('file'), productController.createProduct);
router.get('/:categorieId/products', productController.getAllProducts);
router.get('/:categorieId/products/:id', productController.readOneProduct);
router.put('/:categorieId/products/:id', upload.single('file'), productController.updateProduct);
router.delete('/:categorieId/products/:id', productController.deleteProduct);

//Customers Products Routes
router.get('/', productController.showAllProducts);
router.get('/:id', productController.showProduct);



module.exports = router;