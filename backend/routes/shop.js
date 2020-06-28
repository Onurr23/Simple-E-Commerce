const router = require('express').Router();
const shopController = require('../controllers/shopController');
const auth = require('../middleware/auth');


router.get('/',shopController.getProducts)

router.post('/add-product', auth , shopController.addProduct);

router.delete('/delete/:id', auth ,shopController.deleteProduct)

router.post('/products/update/:id', auth ,shopController.updateProduct);

router.get('/categories/:id',shopController.getProductsByCategoryId)

router.get('/products/:id',shopController.getProduct);

router.get('/profile/products/:id',shopController.getUserProducts);




module.exports = router;
